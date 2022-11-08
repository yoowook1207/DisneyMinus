import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPageComponent } from '../registration1/register-page.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [{path: 'registration', component: RegisterPageComponent}]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [RouterModule]
})
export class LazyRegisterModule { }
