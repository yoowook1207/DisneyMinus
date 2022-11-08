import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie, singlePageMovie } from 'src/app/movie.interface';
import { MovieServiceService } from 'src/app/services/tmdb/movie-service.service';

@Component({
  selector: 'app-single-page',
  templateUrl: './single-page.component.html',
  styleUrls: ['./single-page.component.scss'],
})
export class SinglePageComponent implements OnInit {
  videoUrl!: string;
  fromId!: string;
  setMovie: any = {
    id: 0,
    imdb_id: 0,
    title: '',
    release_date: '',
    runtime: 0,
    language: '',
    voteScore: 0,
    description: '',
    posterUrl: '',
    genre: [],
    tagline: '',
  };
  whereToWatch: string =
    'https://www.themoviedb.org/movie/' +
    this.setMovie.id +
    ' ' +
    this.setMovie.title +
    '/watch?locale=US';
  logoUrl!: any;
  castingListDetailed!: any[];
  castingList!: any[];

  isCastingShow: boolean = true;
  isCastBtnShow: boolean = false;

  constructor(
    public movieSearch: MovieServiceService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let tempId = '';
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.fromId = params.get('id') || '';
      tempId = params.get('id') || '';
    });

    this.movieSearch
      .getTrailerUrl(Number(tempId))
      .subscribe(
        (e) =>
          (this.videoUrl =
            'https://www.youtube.com/embed/' +
            e.results.filter((x: any) => x.type.includes('Trailer')).pop().key +
            '?autoplay=1')
      );

    this.movieSearch
      .getSingleMovie(Number(tempId))
      .subscribe((e) => (this.setMovie = e));

    this.movieSearch.getLogo(Number(tempId)).subscribe((e) => {
      let imgPath = e.logos?.filter( e=> e.iso_639_1 == 'en')[0]
      this.logoUrl = 'https://image.tmdb.org/t/p/original' + imgPath?.file_path
    });

    this.movieSearch.getCredits(Number(tempId)).subscribe((e) => {
      (this.castingListDetailed = e), (this.castingList = e.slice(0, 5));
    });
  }

  showCasting() {
    this.isCastingShow = !this.isCastingShow;
    this.isCastBtnShow = !this.isCastBtnShow;
  }
}
