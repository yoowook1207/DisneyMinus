import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { LoginPageComponent } from './page/login-page/login1/login-page.component';
import { RegisterPageComponent } from './page/register-page/registration1/register-page.component';
import { HomePageComponent } from './page/home-page/home1/home-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { MovieItemComponent } from './page/home-page/movie-dialog/movie-item.component';
import { LandingPageComponent } from './page/landing-page/landing-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialExampleModule } from './material.module';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { MatIconModule } from '@angular/material/icon';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from '@ngrx/store';
// import { CoreModule } from './core/core.module';
// import { AuthReducer } from './Ngrx/Auth/auth.reducers';
// import { AuthEffects } from './Ngrx/Auth/auth.effects';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    LandingPageComponent,
  ],
  imports: [
    // CoreModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MaterialExampleModule,
    ReactiveFormsModule,
    MatIconModule,
    SharedModule,
    // StoreModule.forRoot({ auth: AuthReducer }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
