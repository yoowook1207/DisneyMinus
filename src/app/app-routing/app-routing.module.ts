import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MoviePreloadingStrategy } from '../core/preloading-strategies/movie.preloading';

const routes: Routes = [
  {
    path: 'welcome',
    loadChildren: () =>
      import('../page/landing-page/lazy-landing.module').then(
        (data) => data.LazyLandingModule
      ),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('../page/home-page/lazy-home.module').then(
        (data) => data.LazyHomeModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('../page/login-page/lazy-login.module').then(
        (data) => data.LazyLoginModule
      ),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('../page/register-page/lazy-register.module').then(
        (data) => data.LazyRegisterModule
      ),
    data: { preload: true, delay: 1000 },
  },
  { path: '', redirectTo: 'welcome', pathMatch:'full'},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {
      preloadingStrategy: MoviePreloadingStrategy,
      scrollPositionRestoration: 'enabled',
      scrollOffset: [0, 0],
      anchorScrolling: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
