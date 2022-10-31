import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  constructor(public fb: FormBuilder) {}
  checkUser!: FormGroup;
  newOrNot: string = '';

  get email(): FormControl {
    return this.checkUser.get('email') as FormControl;
  }

  ngOnInit(): void {
    this.checkUser = this.fb.group({
      email: [
        '',
        [Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')],
      ],
    });
  }

  ngDoCheck() {
    // if email is exist, 'login', else if email is not exist, 'register'
    if (this.email.valid && (this.email.dirty || this.email.touched)) {
      this.newOrNot = 'register/registration';
      // login/loginpage
    }
    // else if (this.email.valid && (this.email.dirty || this.email.touched)) {
    //   this.newOrNot = 'register/registration';
    // }
  }
}
