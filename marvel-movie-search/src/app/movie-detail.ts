// movie-detail.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MovieService, Movie } from './movie-list/movie.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './movie-detail.html',
  styleUrls: ['./movie-detail.css']
})
export class MovieDetailComponent {
  movie!: Movie;
  isLoading = true;
  hasError = false;
  comment = { name: '', text: '' };
  comments: { name: string; text: string }[] = [];


  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.movieService.getMovieById(id).subscribe({
      next: movie => {
        this.movie = movie;
        this.isLoading = false;
      },
      error: () => {
        this.hasError = true;
        this.isLoading = false;
      }
    });
  }
  submitComment() {
    if (this.comment.name.trim() && this.comment.text.trim()) {
      this.comments.push({ ...this.comment });
      this.comment = { name: '', text: '' }; // reset form fields
    }
  }
}
