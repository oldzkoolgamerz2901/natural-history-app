import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterRenderEffect,
  computed,
  effect,
  inject,
  input,
  viewChild,
  DOCUMENT,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { CHART, ERAS, EXHIBITS, EXTINCTIONS, PERIODS, REFERENCES } from '../content/catalogue';
import { formatBoundary, formatRange } from '../content/geology';

@Component({
  selector: 'app-exhibit',
  imports: [RouterLink],
  templateUrl: './exhibit.html',
  styles: ':host { display: block; }',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Exhibit {
  readonly kind = input<string>('unknown');
  readonly id = input<string>('');
  private readonly title = inject(Title);
  private readonly document = inject(DOCUMENT);
  private readonly heading = viewChild<ElementRef<HTMLHeadingElement>>('heading');
  protected readonly period = computed(() =>
    PERIODS.find((p) => p.id === (this.kind() === 'period' ? this.id() : this.event()?.periodId)),
  );
  protected readonly event = computed(() =>
    this.kind() === 'extinction' ? EXTINCTIONS.find((e) => e.id === this.id()) : undefined,
  );
  protected readonly entity = computed(() =>
    this.kind() === 'period' ? this.period() : this.event(),
  );
  protected readonly era = computed(() => ERAS.find((e) => e.id === this.period()?.eraId));
  protected readonly content = computed(() =>
    EXHIBITS.find((e) => e.kind === this.kind() && e.id === this.id()),
  );
  protected readonly sources = computed(() =>
    REFERENCES.filter((r) =>
      (
        this.content()?.referenceIds ??
        (this.kind() === 'extinction' ? ['ics', 'big-five'] : ['ics'])
      ).includes(r.id),
    ),
  );
  protected readonly chart = CHART;
  protected readonly boundary = formatBoundary;
  protected readonly range = formatRange;
  protected readonly dateLabel = computed(() => {
    const period = this.period();
    return this.kind() === 'period' && period
      ? formatRange(period.start.age, period.end.age)
      : this.event()?.timingNote;
  });
  protected readonly reference = (id: string) => REFERENCES.find((r) => r.id === id)!;

  constructor() {
    effect(() =>
      this.title.setTitle(
        `${this.entity()?.name ?? 'Exhibit not found'} | Natural History Explorer`,
      ),
    );
    afterRenderEffect(() => {
      this.id();
      this.kind();
      const heading = this.heading()?.nativeElement;
      if (!heading) return;
      heading.focus({ preventScroll: true });
      const rect = heading.getBoundingClientRect();
      const viewport = this.document.defaultView?.innerHeight ?? 0;
      if (rect.top < 0 || rect.bottom > viewport) heading.scrollIntoView({ block: 'start' });
    });
  }

  protected returnToTimeline(): void {
    const target = this.document.getElementById('timeline-title');
    target?.focus({ preventScroll: true });
    target?.scrollIntoView({ block: 'start' });
  }
}
