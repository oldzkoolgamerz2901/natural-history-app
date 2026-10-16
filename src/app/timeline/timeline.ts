import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CHART, ERAS, EXTINCTIONS, PERIODS, PHANEROZOIC_START } from '../content/catalogue';
import { durationPercent, formatRange, positionPercent } from '../content/geology';

@Component({
  selector: 'app-timeline',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './timeline.html',
  styleUrl: './timeline.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Timeline {
  protected readonly eras = ERAS;
  protected readonly periods = PERIODS;
  protected readonly extinctions = EXTINCTIONS;
  protected readonly chart = CHART;
  protected readonly oldest = PHANEROZOIC_START;
  protected readonly ticks = [500, 400, 300, 200, 100];
  protected readonly range = formatRange;
  protected readonly position = (age: number) => positionPercent(age, PHANEROZOIC_START);
  protected readonly width = (start: number, end: number) =>
    durationPercent(start, end, PHANEROZOIC_START);
}
