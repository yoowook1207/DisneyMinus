import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home1/home-page.component';
import { SinglePageComponent } from './home2-single/single-page.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { MovieItemComponent } from './movie-dialog/movie-item.component';
import { MatIconModule } from '@angular/material/icon';
import { SafeUrlPipe } from 'src/app/pipes/safe-url.pipe';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { Home3CreditComponent } from './home3-credit/home3-credit.component';
import { CreditDetailResolver } from 'src/app/core/resolvers/creditDetail.resolver';
import { ActorsMoviesResolver } from 'src/app/core/resolvers/actorsMovies.resolver';
import { MovieItemGuard } from 'src/app/core/guards/movie-item.guard';

const routes: Routes = [
  { path: 'homepage', component: HomePageComponent },
  { path: 'movie', component: SinglePageComponent, canActivate: [MovieItemGuard] },
  {
    path: 'credit/:id',
    component: Home3CreditComponent,
    resolve: {
      creditDetail: CreditDetailResolver,
      actorsMovies: ActorsMoviesResolver,
    },
  },
  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    HomePageComponent,
    SinglePageComponent,
    MovieItemComponent,
    SafeUrlPipe,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    SharedModule,
    MatIconModule,
    InfiniteScrollModule,
  ],
  exports: [RouterModule],
})
export class LazyHomeModule {}
