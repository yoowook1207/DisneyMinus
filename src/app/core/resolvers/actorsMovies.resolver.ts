import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { MovieServiceService } from 'src/app/services/tmdb/movie-service.service';

@Injectable({ providedIn: 'root' })
export class ActorsMoviesResolver implements Resolve<any> {
  constructor(private service: MovieServiceService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.service.getActorsMovies(route.paramMap.get('id'));
  }
}
