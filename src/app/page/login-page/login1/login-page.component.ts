import { Component, Inject, OnInit } from '@angular/core';
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
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProdTitle } from 'src/app/core/core.module';
import { Title } from '@angular/platform-browser';

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

  get pwd(): FormControl {
    return this.loginForm.get('pwd') as FormControl;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly titleService: Title,
    @Inject(ProdTitle) private readonly prodTitle: string
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(`${this.prodTitle}-SignIn`);

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
      ],
      pwd: ['', [Validators.required]],
    });
  }

  onSubmit() {
    const credentialSignIn = {
      email: this.email?.value,
      pwd: this.pwd?.value,
    };
    this.authService.login(credentialSignIn).subscribe();
  }
}
