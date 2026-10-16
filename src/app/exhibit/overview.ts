import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { REFERENCES } from '../content/catalogue';

@Component({
  selector: 'app-overview',
  imports: [RouterLink],
  styles: ':host { display: block; }',
  template: `
    <article class="exhibit-card overview-card">
      <p class="eyebrow">YOUR JOURNEY STARTS HERE</p>
      <h2>A small window into<br /><em>an immense past.</em></h2>
      <p class="exhibit-introduction">
        The Phanerozoic is the most recent chapter of Earth's history: about 539 million years of
        changing life, landscapes, and seas.
      </p>
      <div class="orientation-grid">
        <div>
          <span class="orientation-number">12</span>
          <h3>Geological periods</h3>
          <p>
            Chapters of unequal length, grouped into three eras. Their widths on the timeline
            reflect how long they lasted.
          </p>
        </div>
        <div>
          <span class="orientation-number">05</span>
          <h3>Major mass extinctions</h3>
          <p>
            Intervals when many species disappeared unusually rapidly. Numbered markers locate five
            major crises.
          </p>
        </div>
      </div>
      <div class="invitation">
        <p class="eyebrow">TWO EXHIBITS OPEN FOR EXPLORATION</p>
        <h3>Begin with a world on the brink.</h3>
        <p>Explore the Permian, then follow its closing extinction into a changed world.</p>
        <a class="primary-link" routerLink="/period/permian"
          >Enter the Permian <span aria-hidden="true">↗</span></a
        >
        <a class="text-link" routerLink="/extinction/end-permian"
          >Explore the end-Permian extinction <span aria-hidden="true">→</span></a
        >
      </div>
      <p class="context-note">
        Earlier Earth history occupies billions of years before this timeline. It is outside this
        collection's detailed coverage. Other exhibits are in preparation.
      </p>
      <details class="sources">
        <summary>Sources &amp; how to read the atlas</summary>
        <p>
          Ma means million years ago. All numerical ages are estimates; ± gives a published
          uncertainty where supplied. Dates use the fixed ICS 2026/06 edition. Colors are an
          editorial palette, not the official ICS color scheme.
        </p>
        <p>
          Extinction markers are approximate overview locations, not claims that all losses occurred
          at one instant. Fossil evidence is uneven; many extinction estimates concern marine groups
          rather than all life.
        </p>
        <ul>
          @for (source of sources; track source.id) {
            <li>
              <a [href]="source.url">{{ source.title }}</a
              ><span>{{ source.detail }}</span>
            </li>
          }
        </ul>
      </details>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Overview {
  protected readonly sources = REFERENCES.filter((r) => ['ics', 'big-five'].includes(r.id));
  constructor() {
    inject(Title).setTitle('Natural History Explorer | An atlas of deep time');
  }
}
