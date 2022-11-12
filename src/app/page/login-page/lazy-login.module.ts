import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login1/login-page.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [{path: 'loginpage', component: LoginPageComponent}]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [RouterModule]
})
export class LazyLoginModule { }
