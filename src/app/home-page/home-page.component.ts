import { Component, OnInit } from '@angular/core';
import { Observable, pipe, Subscription, tap } from 'rxjs';
import { MovieServiceService } from '../movie-service.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  popularList! : any
  topRatedList! : any

  constructor(public movieSearch: MovieServiceService) { }

  popularMovieList: any[] = [];

  ngOnInit(): void {
    this.movieSearch.getMovieList('popular').subscribe(e => this.popularList = e)
    this.movieSearch.getMovieList('top_rated').subscribe(e => this.topRatedList = e)

  };

  openModal() {
    
  }

}
