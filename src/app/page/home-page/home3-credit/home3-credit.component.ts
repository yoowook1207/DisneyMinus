import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home3-credit',
  templateUrl: './home3-credit.component.html',
  styleUrls: ['./home3-credit.component.scss'],
})
export class Home3CreditComponent implements OnInit {
  creditInfo: any;
  popularMovies: any;
  constructor(private readonly activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    const creditDetail = this.activatedRoute.snapshot.data['creditDetail'];
    const actorsMovieList =
      this.activatedRoute.snapshot.data['actorsMovies'].cast;
    this.creditInfo = creditDetail;

    this.popularMovies = actorsMovieList.sort((a: any, b: any) => {
      return b.popularity - a.popularity;
    });

    console.log(this.popularMovies);
  }
}
