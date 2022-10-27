import { Component, OnInit } from '@angular/core';
import { MovieServiceService } from '../movie-service.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MovieItemComponent } from '../movie-item/movie-item.component';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  popularList! : any
  topRatedList! : any

  constructor(public movieSearch: MovieServiceService, public dialog: MatDialog) { }

  popularMovieList: any[] = [];

  ngOnInit(): void {
    this.movieSearch.getMovieList('popular').subscribe(e => this.popularList = e)
    this.movieSearch.getMovieList('top_rated').subscribe(e => this.topRatedList = e)
  };



  openDialog(x:any): void {
    console.log(x.id)
    const dialogRef = this.dialog.open(MovieItemComponent, {
      width: '50%',
      height: '50%',
      data: x,
    })

    dialogRef.afterClosed().subscribe();
  }

}
