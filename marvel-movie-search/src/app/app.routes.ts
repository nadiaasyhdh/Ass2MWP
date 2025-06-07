// app.routes.ts
import { Routes } from '@angular/router';
import { MovieListComponent } from './movie-list/movie-list';
import { MovieDetailComponent } from './movie-detail';

export const routes: Routes = [
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
  { path: 'movies', component: MovieListComponent },
  { path: 'movies/:id', component: MovieDetailComponent },
  { path: '**', redirectTo: 'movies' }
];
