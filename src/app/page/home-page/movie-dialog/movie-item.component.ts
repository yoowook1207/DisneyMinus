import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HomePageComponent } from '../home1/home-page.component';
import { MovieServiceService } from '../../../services/tmdb/movie-service.service';
import { setMovie } from '../../../movie.interface';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss'],
})
export class MovieItemComponent implements OnInit {
  videoUrl!: any;
  id: number = this.data.id;
  logoUrl: string = ''

  constructor(
    public movieSearch: MovieServiceService,
    public dialogRef: MatDialogRef<HomePageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: setMovie
  ) {}

  ngOnInit(): void {
    console.log(this.data)
    this.movieSearch.getLogo(this.data.id).subscribe((e) => {
      let imgPath = e.logos?.filter( e=> e.iso_639_1 == 'en')[0]
      if(imgPath) {
        this.logoUrl = 'https://image.tmdb.org/t/p/original' + imgPath?.file_path
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
