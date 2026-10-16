import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Timeline } from './timeline/timeline';
import { Catalogue } from './catalogue/catalogue';

@Component({
  imports: [RouterLink, RouterOutlet, Timeline, Catalogue],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
