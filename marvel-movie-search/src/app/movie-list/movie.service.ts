import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Movie {
  id: number;
  title: string;
  description: string;
  year: number;
  genre: string;
  image: string;
}

@Injectable({ providedIn: 'root' })
export class MovieService {
  private apiKey = 'b7ba03d53f5943ba26667d2ce66ff790'; // <-- Replace with your TMDb API key
  private marvelCompanyIds = '420'; // Marvel Studios company ID

  constructor(private http: HttpClient) {}

 getMovies(): Observable<Movie[]> {
  const discoverUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&with_companies=${this.marvelCompanyIds}&sort_by=popularity.desc`;
  return this.http.get<any>(discoverUrl).pipe(
    map(response =>
      response.results.map((m: any) => ({
        id: m.id,
        title: m.title,
        description: m.overview,
        year: m.release_date ? new Date(m.release_date).getFullYear() : 0,
        genre: 'N/A',
        image: m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : ''
      }))
    )
  );
}

  getMovieById(id: number): Observable<Movie> {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${this.apiKey}`;
    return this.http.get<any>(url).pipe(
      map(m => ({
        id: m.id,
        title: m.title,
        description: m.overview,
        year: m.release_date ? new Date(m.release_date).getFullYear() : 0,
        genre: m.genres?.map((g: any) => g.name).join(', ') || 'N/A',
        image: m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : ''
      }))
    );
  }

  // No updateMovie method — TMDb API is read-only
}
