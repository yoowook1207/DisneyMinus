import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { MovieServiceService } from 'src/app/services/tmdb/movie-service.service';

@Injectable({ providedIn: 'root' })
export class CreditDetailResolver implements Resolve<any> {
  constructor(private service: MovieServiceService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.service.getCreditDetails(route.paramMap.get('id'));
  }
}
