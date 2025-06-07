// movie-list.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieService, Movie } from './movie.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './movie-list.html',
  styleUrls: ['./movie-list.css']
})
export class MovieListComponent {
  searchTerm: string = '';
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];
  isLoading = false;
  

  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies() {
    this.isLoading = true;
    this.movieService.getMovies().subscribe(movies => {
      this.movies = movies;
      this.filteredMovies = movies; // initialize with all Marvel movies
      this.isLoading = false;
    });
  }

onSearchChange() {
  const term = this.searchTerm.trim().toLowerCase();
  this.filteredMovies = this.movies.filter(movie =>
    movie.title.toLowerCase().includes(term)
  );
}

  selectMovie(movie: Movie) {
    this.router.navigate(['/movies', movie.id]);
  }
}
