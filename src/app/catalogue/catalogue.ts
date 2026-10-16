import { ChangeDetectionStrategy, Component, DOCUMENT, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ERAS, EXHIBITS, EXTINCTIONS, PERIODS } from '../content/catalogue';
import { formatRange } from '../content/geology';

@Component({
  selector: 'app-catalogue',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './catalogue.html',
  styleUrl: './catalogue.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Catalogue {
  protected readonly periodsInitiallyOpen =
    !inject(DOCUMENT).defaultView?.matchMedia('(max-width: 700px)').matches;
  protected readonly groups = ERAS.map((era) => ({
    ...era,
    periods: PERIODS.filter((p) => p.eraId === era.id),
  }));
  protected readonly events = EXTINCTIONS;
  protected readonly range = formatRange;
  protected ready(kind: string, id: string) {
    return EXHIBITS.some((e) => e.kind === kind && e.id === id);
  }
}
