import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MovieServiceService } from '../movie-service.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(public movieSearch: MovieServiceService) {
    this.movieSearch.getMovieList('popular');

   }

  popularMovieList: any[] = [];

  ngOnInit(): void {
    this.movieSearch.getMovieList('popular').subscribe();
    
    console.log(this.movieSearch.movieListObs$)
  };

}
