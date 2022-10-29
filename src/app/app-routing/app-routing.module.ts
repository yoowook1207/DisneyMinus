import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from '../page/landing-page/landing-page.component';

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'home', loadChildren: () => import('../page/home-page/lazy-home/lazy-home.module').then((data) => data.LazyHomeModule)},
  {path: 'login', loadChildren: () => import('../page/login-page/lazy-login/lazy-login.module').then((data) => data.LazyLoginModule)},
  {path: 'register', loadChildren: () => import('../page/register-page/lazy-register/lazy-register.module').then((data) => data.LazyRegisterModule)},

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
