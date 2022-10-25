import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, single, tap } from 'rxjs/operators';
import { MovieList, Movie } from './movie.interface';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieServiceService {

  // private movieList = [];
  // private movieList$ = new BehaviorSubject<any>(this.movieList);
  // movieListObs$ = this.movieList$.asObservable();

  // https://api.themoviedb.org/3/movie/<<selector>>/api_key

  private movieApi =
    'https://api.themoviedb.org/3/movie/' 
    
  private apiKey =
    '?api_key=853043fdeca6234b3e9eb82c09fc9ff3';

  constructor(private readonly http: HttpClient) {}

  getMovieList(inputSelector: any) {
    return this.http.get<MovieList>(this.movieApi+inputSelector+this.apiKey).pipe(
      map(({ results }: MovieList) => {
        return results.map((movie: Movie) => {
          const eachMovies: any = {
            id: movie.id,
            movieTitle: movie.title,
            release_date: movie.release_date,
            posterUrl: 'https://image.tmdb.org/t/p/original' + movie.poster_path,
            language: movie.original_language,
            popularity: movie.popularity,
          };

          return eachMovies;
        });
      }),
      // tap((moviesFromBackend: any) => {
      //   this.movieList = moviesFromBackend;
      //   this.movieList$.next(this.movieList);
      // })
    );
  };

  getById(movieId: number) {
    let movieApi =
    'https://api.themoviedb.org/3/movie/' +
    movieId +
    '?api_key=853043fdeca6234b3e9eb82c09fc9ff3';

    return this.http.get<Movie>(movieApi).subscribe(
      x=> {
        const singleMovie:any ={
          id: x.id,
          movieTitle: x.title,
          release_date: x.release_date,
          genre: x.genres?.map(x=>x.name),
          language: x.spoken_languages[0].english_name,
          homepage: x.homepage,
        }
        return singleMovie
      }

    )
  }
}
