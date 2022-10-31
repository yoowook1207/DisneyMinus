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
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  fromEmail!: string;

  regFirstPage!: FormGroup;
  pwdNotMatch = 'pwdNotMatch';
  showTermError: boolean = true;

  get email(): FormControl {
    return this.regFirstPage.get('email') as FormControl;
  }
  get pwd(): FormGroup {
    return this.regFirstPage.get('pwd') as FormGroup;
  }
  get term(): FormControl {
    return this.regFirstPage.get('agreeTerm') as FormControl;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.fromEmail = params.get('email') || '';
    });
    this.regFirstPage = this.fb.group({
      email: [
        this.fromEmail || '',
        [
          Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'),
          Validators.required,
        ],
        // [this.asyncCheckEmail]
      ],
      pwd: this.fb.group(
        {
          password: [
            '',
            [
              this.minlen(5),
              this.isSymbol(),
              this.isLower(),
              this.isUpper(),
              this.isNumber(),
            ],
          ],
          passwordConfirm: [''],
        },
        {
          validators: [this.matchPwd],
        }
      ),
      agreeTerm: false,
    });
  }

  ngDoCheck(): void {
    if (this.term.value) {
      this.showTermError = true;
    }
  }

  onSubmit() {
    if (!this.term.value) {
      this.showTermError = false;
    }
  }

  filledAll = () => {
    if (this.email.valid && this.pwd.valid && this.term.value) {
      return true;
    } else return false;
  };

  private matchPwd = (group: FormGroup): ValidationErrors | null => {
    const pwdval = group.get('password')?.value;
    const cfmval = group.get('passwordConfirm')?.value;
    if (pwdval !== cfmval) {
      return { [this.pwdNotMatch]: true };
    }
    return null;
  };

  private minlen(limitednum: number): ValidatorFn {
    return function (control: AbstractControl): ValidationErrors | null {
      if (control.value.length < limitednum) {
        return {
          minlen: true,
          requiredLength: limitednum,
        };
      }
      return null;
    };
  }

  private isSymbol(): ValidatorFn {
    return function (control: AbstractControl): ValidationErrors | null {
      let reg = new RegExp('[*.!@#$%^&?]');
      if (!reg.test(control.value)) {
        return {
          isSymbol: true,
        };
      }
      return null;
    };
  }

  private isLower(): ValidatorFn {
    return function (control: AbstractControl): ValidationErrors | null {
      let reg = new RegExp('[a-z]');
      if (!reg.test(control.value)) {
        return {
          isLower: true,
        };
      }
      return null;
    };
  }

  private isUpper(): ValidatorFn {
    return function (control: AbstractControl): ValidationErrors | null {
      let reg = new RegExp('[A-Z]');
      if (!reg.test(control.value)) {
        return {
          isUpper: true,
        };
      }
      return null;
    };
  }

  private isNumber(): ValidatorFn {
    return function (control: AbstractControl): ValidationErrors | null {
      let reg = new RegExp('[0-9]');
      if (!reg.test(control.value)) {
        return {
          isNumber: true,
        };
      }
      return null;
    };
  }

  // private asyncCheckEmail = (
  //   control: FormControl
  // ): Observable<ValidationErrors | null> => {
  //   const url = 'http://localhost:4231/auth/check-email';
  //   const value: string = control.value;

  //   return this.http.post(url, { email: value }).pipe(
  //     debounceTime(500),
  //     map((data: any) => {
  //       console.log('data')
  //       if (data) {
  //         return { hasemail: true }
  //       };
  //       return null;
  //     })
  //   );
  // }
}