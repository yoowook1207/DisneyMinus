import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
} from '@angular/material/dialog';
import { MovieServiceService } from '../../../services/tmdb/movie-service.service';
import { MovieItemComponent } from '../movie-dialog/movie-item.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  popularList!: any;
  topRatedList!: any;
  infinitePageNum: number = 1

  constructor(
    public movieSearch: MovieServiceService,
    public dialog: MatDialog
  ) {}

  popularMovieList: any[] = [];

  ngOnInit(): void {
    this.movieSearch
      .getMovieList('popular', 1)
      .subscribe((e) => (this.popularList = e));
    this.movieSearch
      .getMovieList('top_rated', 1)
      .subscribe((e) => (this.topRatedList = e));
  }

  openDialog(x: any): void {
    const dialogRef = this.dialog.open(MovieItemComponent, {
      maxWidth: '1080px',
      maxHeight: '1080px',
      width: '75vw',
      height: '65vh',
      data: x,
    });

    dialogRef.afterClosed().subscribe();
  }

  onScroll() {
    this.infinitePageNum = this.infinitePageNum +1
    this.movieSearch
      .getMovieList('top_rated', this.infinitePageNum)
      .subscribe((e) => (this.topRatedList = this.topRatedList.concat(e)));
  }
}
