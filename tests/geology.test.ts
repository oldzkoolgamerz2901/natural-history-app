import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import {
  CHART,
  ERAS,
  EXHIBITS,
  EXTINCTIONS,
  PERIODS,
  PHANEROZOIC_START,
  REFERENCES,
} from '../src/app/content/catalogue.ts';
import { durationPercent, formatBoundary, positionPercent } from '../src/app/content/geology.ts';

test('periods form one continuous, complete Phanerozoic timeline', () => {
  assert.equal(PERIODS.length, 12);
  assert.equal(PERIODS[0].start.age, PHANEROZOIC_START);
  assert.equal(PERIODS.at(-1)!.end.age, 0);
  for (const [i, period] of PERIODS.entries()) {
    assert.ok(period.start.age > period.end.age, period.id);
    if (i > 0) assert.equal(period.start.age, PERIODS[i - 1].end.age, period.id);
    const era = ERAS.find((era) => era.id === period.eraId)!;
    assert.ok(period.start.age <= era.start.age && period.end.age >= era.end.age);
  }
  const total = PERIODS.reduce(
    (sum, period) => sum + durationPercent(period.start.age, period.end.age, PHANEROZOIC_START),
    0,
  );
  assert.ok(Math.abs(total - 100) < 1e-10);
});

test('geometry preserves time direction and short interval proportions', () => {
  assert.equal(positionPercent(PHANEROZOIC_START, PHANEROZOIC_START), 0);
  assert.equal(positionPercent(0, PHANEROZOIC_START), 100);
  const quaternary = PERIODS.find((p) => p.id === 'quaternary')!;
  assert.ok(durationPercent(quaternary.start.age, 0, PHANEROZOIC_START) < 0.5);
  assert.equal(durationPercent(300, 200, 500), 20);
  assert.equal(positionPercent(200, 500), 60);
});

test('pinned chart values retain precision and uncertainty', () => {
  assert.ok(CHART.url.endsWith('ChronostratChart2026-06.pdf'));
  const permian = PERIODS.find((p) => p.id === 'permian')!;
  assert.deepEqual(permian.start, { age: 298.9, uncertainty: 0.15 });
  assert.deepEqual(permian.end, { age: 251.902, uncertainty: 0.024 });
  assert.equal(formatBoundary(permian.end), '251.902 ± 0.024 Ma');
  assert.equal(formatBoundary({ age: 0 }), 'present');
});

test('five extinction markers have ordered, bounded ranges and valid period associations', () => {
  assert.equal(EXTINCTIONS.length, 5);
  for (const event of EXTINCTIONS) {
    const period = PERIODS.find((p) => p.id === event.periodId)!;
    assert.ok(period, event.id);
    assert.ok(event.oldest >= event.youngest);
    assert.ok(event.oldest <= period.start.age && event.youngest >= period.end.age);
    assert.ok(event.timingNote.length > 0);
  }
  const devonian = EXTINCTIONS.find((e) => e.id === 'late-devonian')!;
  assert.ok(devonian.oldest - devonian.youngest > 10);
});

test('the two finished exhibits have resolving references and local, credited visuals', () => {
  assert.deepEqual(
    EXHIBITS.map((e) => `${e.kind}/${e.id}`),
    ['period/permian', 'extinction/end-permian'],
  );
  const known = new Set(REFERENCES.map((r) => r.id));
  for (const exhibit of EXHIBITS) {
    assert.ok(exhibit.sections.length >= 3);
    for (const id of [
      ...exhibit.referenceIds,
      ...exhibit.visual.referenceIds,
      ...exhibit.sections.flatMap((s) => s.referenceIds),
    ]) {
      assert.ok(known.has(id), `${exhibit.id}: ${id}`);
      assert.ok(exhibit.referenceIds.includes(id), `${id} must appear in the exhibit bibliography`);
    }
    assert.ok(exhibit.visual.alt.length > 20);
    assert.ok(exhibit.visual.credit.includes('CC0'));
    assert.ok(
      readFileSync(new URL(`../public/${exhibit.visual.src}`, import.meta.url), 'utf8').includes(
        '<svg',
      ),
    );
  }
  assert.equal(new Set(PERIODS.map((p) => p.id)).size, 12);
  assert.equal(new Set(EXTINCTIONS.map((e) => e.id)).size, 5);
});
