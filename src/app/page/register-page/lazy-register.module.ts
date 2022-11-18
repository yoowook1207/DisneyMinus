import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPageComponent } from './registration1/register-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegisterPage2Component } from './registration2/register-page2.component';
import { RegisterComponent } from './register.component';
import { Registration3Component } from './registration3/registration3.component';

const routes: Routes = [
  {
    path: '',
    component: RegisterComponent,
    children: [
      { path: 'step1', component: RegisterPageComponent },
      { path: 'step2', component: RegisterPage2Component },
      { path: 'step3', component: Registration3Component },
      { path: '', redirectTo: 'step1', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  declarations: [
    RegisterComponent,
    RegisterPageComponent,
    RegisterPage2Component,
    Registration3Component
  ],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class LazyRegisterModule {}
