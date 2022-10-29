import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { HomePageComponent } from '../home-page/home-page.component';
import { MovieServiceService } from '../../services/tmdb/movie-service.service';
import { setMovie } from '../../movie.interface';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss'],
})
export class MovieItemComponent implements OnInit {
  videoUrl!: any;

  castingListDetailed!: any[];
  castingList!: any[];

  isCastingShow: boolean = true;
  isCastBtnShow: boolean = false;

  constructor(
    public movieSearch: MovieServiceService,
    public dialogRef: MatDialogRef<HomePageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: setMovie
  ) {}

  ngOnInit(): void {
    this.movieSearch
      .getTrailerUrl(this.data.id)
      .subscribe(
        (e) =>
          (this.videoUrl =
            'https://www.youtube.com/embed/' +
            e.results.filter((x: any) => x.type.includes('Trailer')).pop().key +
            '?autoplay=1')
      );

    this.movieSearch.getCredits(this.data.id).subscribe(
      (e) => {
          this.castingListDetailed = e.cast.map((e: any) => {
          return { name: e.name, character: e.character };
        },
          this.castingList = e.cast.map((e:any) => {
            return {name: e.name, character: e.character }
          }).slice(0,5)
        )
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  showCasting() {
    this.isCastingShow = !this.isCastingShow;
    this.isCastBtnShow = !this.isCastBtnShow;
  }
}
