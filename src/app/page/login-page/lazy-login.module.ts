import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login1/login-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginGuard } from 'src/app/core/guards/login.guard';

const routes: Routes = [{path: '', component: LoginPageComponent, canActivate: [LoginGuard]}]

@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
})
export class LazyLoginModule { }
