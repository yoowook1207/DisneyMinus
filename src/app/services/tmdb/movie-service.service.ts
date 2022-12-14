import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, single, tap, } from 'rxjs/operators';
import { MovieList, Movie, setMovie, singleFromList, imgList } from '../../movie.interface';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieServiceService {
  genreList = [
    {
      id: 28,
      name: 'Action',
    },
    {
      id: 12,
      name: 'Adventure',
    },
    {
      id: 16,
      name: 'Animation',
    },
    {
      id: 35,
      name: 'Comedy',
    },
    {
      id: 80,
      name: 'Crime',
    },
    {
      id: 99,
      name: 'Documentary',
    },
    {
      id: 18,
      name: 'Drama',
    },
    {
      id: 10751,
      name: 'Family',
    },
    {
      id: 14,
      name: 'Fantasy',
    },
    {
      id: 36,
      name: 'History',
    },
    {
      id: 27,
      name: 'Horror',
    },
    {
      id: 10402,
      name: 'Music',
    },
    {
      id: 9648,
      name: 'Mystery',
    },
    {
      id: 10749,
      name: 'Romance',
    },
    {
      id: 878,
      name: 'Science Fiction',
    },
    {
      id: 10770,
      name: 'TV Movie',
    },
    {
      id: 53,
      name: 'Thriller',
    },
    {
      id: 10752,
      name: 'War',
    },
    {
      id: 37,
      name: 'Western',
    },
  ];
  // private movieList = [];
  // private movieList$ = new BehaviorSubject<any>(this.movieList);
  // movieListObs$ = this.movieList$.asObservable();

  // https://api.themoviedb.org/3/movie/<<selector>>/api_key

  private movieApi =
    'https://api.themoviedb.org/3/movie/' 
    
  private apiKey =
    '?api_key=853043fdeca6234b3e9eb82c09fc9ff3';

  constructor(private readonly http: HttpClient) {}

  getMovieList(inputSelector: any, pageNum: number) {
    return this.http.get<MovieList>(this.movieApi+inputSelector+this.apiKey+'&page='+pageNum).pipe(
      map(({ results }: MovieList) => {
        return results.map((movie: singleFromList) => {
          const eachMovies: setMovie = {
            id: movie.id,
            movieTitle: movie.title,
            release_date: movie.release_date,
            posterUrl: 'https://image.tmdb.org/t/p/original' + movie.poster_path,
            language: movie.original_language,
            popularity: movie.popularity,
            description: movie.overview,
            genreID: movie.genre_ids.map(x=> {
              return this.genreList.filter(e => e.id==x).map(e => e.name)[0]
            }),
            voteScore: movie.vote_average,
            backdrop: 'https://image.tmdb.org/t/p/original' + movie.backdrop_path,
          };
          return eachMovies;
        });
      }),
    );
  };

  getTrailerUrl(movieId: number) {
    return this.http.get<any>(this.movieApi+movieId+'/videos'+this.apiKey)
  }

  getCredits(movieId: number) {
    return this.http.get<any>(this.movieApi+movieId+'/credits'+this.apiKey).pipe(
      map(({cast}:any)=> {
        return cast.map((actor: any) => {
          const profile: any = {
            name: actor.name,
            character: actor.character,
            profile_path: actor.profile_path,
            credit_id: actor.credit_id
          }
          return profile;
        })
      })
    )
  }

  getSingleMovie(movieId: number) {
    return this.http.get<Movie>(this.movieApi+movieId+this.apiKey).pipe(
      map((movie: Movie) => {
        return {
          id:movie.id,
          imdb_id: movie.imdb_id,
          title: movie.title,
          release_date: movie.release_date,
          runtime: movie.runtime,
          language: movie.original_language,
          voteScore: Math.round(movie.vote_average*10),
          description: movie.overview,
          posterUrl: 'https://image.tmdb.org/t/p/original' + movie.poster_path,
          genre: movie.genres!.map(e=> {return e.name}),
          tagline: movie.tagline,
          backdrop: 'https://image.tmdb.org/t/p/original' + movie.backdrop_path,
          whereToWatch: "https://www.themoviedb.org/movie/" + movie.id + ' ' + movie.title + "/watch?locale=US"
        }
      })
    )
  }

  getLogo(movieId: number) {
    return this.http.get<imgList>(this.movieApi+movieId+'/images'+this.apiKey)
  }

  getCreditDetails(credit_id: any) {
    return this.http.get<any>('https://api.themoviedb.org/3/credit/'+credit_id+this.apiKey)
  }

  getActorsMovies(person_id: any) {
    return this.http.get<any>('https://api.themoviedb.org/3/person/'+person_id+'/movie_credits'+this.apiKey)
  }

}
