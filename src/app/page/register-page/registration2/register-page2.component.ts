import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthNgrxService } from 'src/app/Ngrx/Auth/auth-ngrx.service';
import { AuthService } from 'src/app/services/auth/auth.service';

import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page2',
  templateUrl: './register-page2.component.html',
  styleUrls: ['./register-page2.component.scss'],
})
export class RegisterPage2Component implements OnInit {
  applyTmdbApiKey =
  'https://developers.themoviedb.org/3/getting-started/authentication';
  form!: UntypedFormGroup;

  get username() {
    return this.form.get('username');
  }
  get tmdb_key() {
    return this.form.get('tmdb_key');
  }

  constructor(
    private fb: UntypedFormBuilder,
    private readonly router: Router,
    private readonly authService: AuthNgrxService,
    private readonly authServiceOrg: AuthService

  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: [''],
      tmdb_key: ['', Validators.minLength(30)],
    })
  }

  errorMessageUsername() {
    return this.username?.hasError('required') ? 'You need a username' : '';
  }

  gotoApplyApiKey() {
    window.location.href = this.applyTmdbApiKey;
  }

  onSubmit() {
    // this.authService.addUserInfo(this.form.value);
    this.authServiceOrg.addUserInfo(this.form.value);
    this.router.navigate(['/register/step3']);
  }
}

// const { jwtToken } = this.authService.userValue;

// if (jwtToken) {
//   this.authService
//     .upgradePermission({
//       role: UserRole[this.selectedColumn],
//     })
//     .subscribe();
// } else {
//   this.authService
//     .signup({ role: UserRole[this.selectedColumn] })
//     .subscribe();
// }