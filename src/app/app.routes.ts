import { Routes } from '@angular/router';
import { Overview } from './exhibit/overview';
import { Exhibit } from './exhibit/exhibit';

export const routes: Routes = [
  { path: '', component: Overview, pathMatch: 'full' },
  { path: 'period/:id', component: Exhibit, data: { kind: 'period' } },
  { path: 'extinction/:id', component: Exhibit, data: { kind: 'extinction' } },
  { path: '**', component: Exhibit, data: { kind: 'unknown' } },
];
