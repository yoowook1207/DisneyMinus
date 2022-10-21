import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  user: User ={};
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(formName: NgForm) {
    console.log(this.user)
    console.log(formName.valid)
    console.log(formName.touched)
    console.log(formName.pristine)
    console.log(formName.dirty)
  }

}

export interface User {
  email?: string;
  password?: string;
  passwordConfirmed?: string;
  agreeCheckBox?: boolean;
}