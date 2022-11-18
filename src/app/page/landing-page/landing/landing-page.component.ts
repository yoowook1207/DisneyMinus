import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ProdTitle } from 'src/app/core/core.module';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  constructor(
    public fb: FormBuilder,
    private readonly router: Router,
    private readonly titleService: Title,
    @Inject(ProdTitle) private readonly prodTitle: string
  ) {}
  checkUser!: FormGroup;
  newOrNot: string = '';

  get email(): FormControl {
    return this.checkUser.get('email') as FormControl;
  }

  ngOnInit(): void {
    this.titleService.setTitle(`${this.prodTitle}-landing-page`);

    this.checkUser = this.fb.group({
      email: [
        '',
        [Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')],
      ],
    });
  }

  ngDoCheck() {
    // if email is exist, 'login', else if email is not exist, 'register'
    // if (this.email.valid && (this.email.dirty || this.email.touched)) {
    //   this.newOrNot = '/register';
    //   // login/loginpage
    // }
    // else if (this.email.valid && (this.email.dirty || this.email.touched)) {
    //   this.newOrNot = 'register/registration';
    // }
  }

  registerPage() {
    if (this.email.valid && (this.email.dirty || this.email.touched)) {
      this.router.navigate(['/register/step1']);
    } else {
      alert('Please check your email address!');
    }
  }
}
