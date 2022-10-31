import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  fromEmail: string = '';

  loginForm!: FormGroup;

  get email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  nextPage: string = './';

  testUser = {
    email: 'yoowook1207@gmail.com',
    password: 'Dbtjddnr9395!',
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.fromEmail = params.get('email') || '';
    });

    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'),
          Validators.required,
        ],
        // [this.asyncCheckEmail]
      ],
      password: [''],
    });
  }

  ngDoCheck(): void {
    if (this.password.value === this.testUser.password) {
      this.nextPage = '../../home/homepage';
    }
    console.log(this.nextPage);
  }

  onSubmit() {
    if (this.email.value === '') {
      alert('Please type your email');
    } else if (this.password.value !== this.testUser.password) {
      alert('Your email and password do not match!');
    }
  }
}
