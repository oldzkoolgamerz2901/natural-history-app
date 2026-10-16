import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { PERIODS, EXTINCTIONS, PHANEROZOIC_START } from '../src/app/content/catalogue';

async function openPeriods(page: import('@playwright/test').Page) {
  const directory = page.locator('.period-directory');
  if (!(await directory.evaluate((el) => (el as HTMLDetailsElement).open))) {
    await directory.locator('summary').click();
  }
}

test('orientation, real selection, reload, Back, and invalid-link recovery', async ({
  page,
  isMobile,
}, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await expect(
    page.getByRole('heading', { name: 'A small window into an immense past.' }),
  ).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath('overview.png'), fullPage: true });
  const enter = page.getByRole('link', { name: 'Enter the Permian' });
  if (isMobile) await enter.tap();
  else await enter.click();
  await expect(page).toHaveURL(/#\/period\/permian$/);
  await expect(page.locator('app-exhibit h2')).toHaveText('Permian');
  await expect(page.locator('app-exhibit h2')).toBeFocused();
  await expect(page.locator('.exhibit-dates')).toHaveText('298.9–251.902 Ma');
  await expect(page.locator('.exhibit-visual img')).toBeVisible();
  await expect(page.locator('.exhibit-visual img')).toHaveJSProperty('naturalWidth', 800);
  await page.screenshot({ path: testInfo.outputPath('permian.png'), fullPage: true });
  await page.getByRole('link', { name: 'FOLLOW THE STORY The end-Permian extinction' }).click();
  await expect(page.locator('app-exhibit h2')).toHaveText('End-Permian');
  await expect(page.getByRole('heading', { name: 'Evidence & uncertainty' })).toBeVisible();
  await page.reload();
  await expect(page.locator('app-exhibit h2')).toHaveText('End-Permian');
  await page.goBack();
  await expect(page.locator('app-exhibit h2')).toHaveText('Permian');
  await page.goForward();
  await expect(page.locator('app-exhibit h2')).toHaveText('End-Permian');
  await page.goto('/#/period/not-a-period');
  await expect(page.getByRole('heading', { name: 'An uncharted path.' })).toBeVisible();
  await page.getByRole('link', { name: 'Return to the collection' }).click();
  await expect(page.locator('app-overview')).toBeVisible();
  await page.goto('/#/unknown/path');
  await expect(page.getByRole('heading', { name: 'An uncharted path.' })).toBeVisible();
  expect(errors).toEqual([]);
});

test('every directory destination works and unfinished content is explicit', async ({ page }) => {
  await page.goto('/');
  await openPeriods(page);
  for (const [kind, items] of [
    ['period', PERIODS],
    ['extinction', EXTINCTIONS],
  ] as const) {
    for (const item of items) {
      await page.locator(`app-catalogue a[href="#/${kind}/${item.id}"]`).click();
      await expect(page.locator('app-exhibit h2')).toHaveText(item.name);
      const finished = item.id === 'permian' || item.id === 'end-permian';
      await expect(page.locator('.exhibit-status')).toHaveText(
        finished ? 'OPEN EXHIBIT' : 'IN PREPARATION',
      );
      if (!finished)
        await expect(
          page.getByRole('heading', { name: 'This exhibit is in preparation.' }),
        ).toBeVisible();
      await expect(page.locator('app-catalogue a[aria-current="page"]')).toHaveAttribute(
        'href',
        `#/${kind}/${item.id}`,
      );
    }
  }
});

test('rendered widths stay proportional and the page fits the viewport', async ({
  page,
  isMobile,
}) => {
  await page.goto('/');
  const plot = page.locator('.period-bands');
  await expect(plot.locator('a')).toHaveCount(12);
  const plotWidth = (await plot.boundingBox())!.width;
  for (const period of PERIODS) {
    const width = (await plot.locator(`[data-period="${period.id}"]`).boundingBox())!.width;
    const expected = ((period.start.age - period.end.age) / PHANEROZOIC_START) * plotWidth;
    expect(Math.abs(width - expected), period.id).toBeLessThan(1);
  }
  await expect(page.locator('.event-pin')).toHaveCount(5);
  for (const event of EXTINCTIONS) {
    const pin = page.locator(`.event-pin[href="#/extinction/${event.id}"]`);
    const pinBox = (await pin.boundingBox())!;
    const plotBox = (await plot.boundingBox())!;
    const expectedX =
      plotBox.x +
      ((PHANEROZOIC_START - (event.oldest + event.youngest) / 2) / PHANEROZOIC_START) *
        plotBox.width;
    expect(Math.abs(pinBox.x + pinBox.width / 2 - expectedX), event.id).toBeLessThan(1);
  }
  const marker = page.locator('.event-pin[href="#/extinction/end-permian"]');
  if (isMobile) await marker.tap();
  else await marker.click();
  await expect(page.locator('app-exhibit h2')).toHaveText('End-Permian');
  for (const route of ['/', '/#/period/permian', '/#/extinction/end-permian']) {
    await page.goto(route);
    await expect(page.locator('app-root')).toBeVisible();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    expect(overflow).toBeLessThanOrEqual(1);
  }
});

test('keyboard can skip navigation and activate an exhibit', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to exhibit' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#exhibit-heading')).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Enter the Permian' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('app-exhibit h2')).toBeFocused();
  await expect(page.locator('app-exhibit h2')).toHaveText('Permian');
  await page.getByRole('button', { name: 'Back to timeline' }).click();
  await expect(page.locator('#timeline-title')).toBeFocused();
});

test('core screens pass automated accessibility checks without motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const route of [
    '/',
    '/#/period/permian',
    '/#/extinction/end-permian',
    '/#/period/cambrian',
  ]) {
    await page.goto(route);
    await expect(page.locator('app-root')).toBeVisible();
    const result = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(result.violations).toEqual([]);
  }
});
