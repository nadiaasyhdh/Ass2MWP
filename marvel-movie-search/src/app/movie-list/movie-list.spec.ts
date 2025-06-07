import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MovieListComponent } from './movie-list';
import { MovieService, Movie } from './movie.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;
  let mockMovieService: jasmine.SpyObj<MovieService>;
  let mockRouter: jasmine.SpyObj<Router>;

  const mockMovies: Movie[] = [
    {
      id: 1,
      title: 'Iron Man',
      description: 'Billionaire builds suit.',
      year: 2008,
      genre: 'Action',
      image: 'ironman.jpg'
    },
    {
      id: 2,
      title: 'The Avengers',
      description: 'Superheroes team up.',
      year: 2012,
      genre: 'Action',
      image: 'avengers.jpg'
    }
  ];

  beforeEach(waitForAsync(() => {
    mockMovieService = jasmine.createSpyObj('MovieService', ['getMovies']);
    mockMovieService.getMovies.and.returnValue(of(mockMovies));

    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [MovieListComponent],
      providers: [
        { provide: MovieService, useValue: mockMovieService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // triggers ngOnInit
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load movies on init', () => {
    expect(component.movies.length).toBe(2);
    expect(component.filteredMovies.length).toBe(2);
  });

  it('should filter movies by search term', () => {
    component.searchTerm = 'iron';
    component.onSearchChange();
    expect(component.filteredMovies.length).toBe(1);
    expect(component.filteredMovies[0].title).toBe('Iron Man');
  });

  it('should navigate to movie detail when a movie is selected', () => {
    component.selectMovie(mockMovies[1]);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/movies', 2]);
  });
});
