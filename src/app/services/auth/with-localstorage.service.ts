import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

import { AppUserAuth, UserRole } from '../interfaces/user-auth.interface';
import { AppUser } from '../interfaces/user-login.interface';
import { MovieServiceService } from '../tmdb/movie-service.service';
import { AppUserRegister, UserInfo } from '../interfaces/user-signup.interface';
import { AUTHSERVER } from 'src/app/core/core.module';
import { preserveWhitespacesDefault } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class WithLocalstorageService {
  private jwtHelper = new JwtHelperService();
  private userSubject$!: BehaviorSubject<AppUserAuth>;
  user$!: Observable<AppUserAuth>;

  private appUserRegister = new AppUserRegister();
  private refreshTokenTimeout!: ReturnType<typeof setTimeout>;

  get userValue(): AppUserAuth {
    return this.userSubject$.value;
  }
  get appNewUser(): AppUserRegister {
    return this.appUserRegister;
  }

  constructor(
    private readonly router: Router,
    private readonly http: HttpClient,
    private readonly tmdbService: MovieServiceService,
    @Inject(AUTHSERVER) private readonly authServerPath: string
  ) {
    this.userSubject$ = new BehaviorSubject<AppUserAuth>({});
    this.user$ = this.userSubject$.asObservable();
  }

  /* SignIn */
  login(appUser: AppUser): Observable<{ accessToken: string }> {
    return this.http
      .post<{ accessToken: string }>(
        `${this.authServerPath}/user/signin`,
        appUser
      )
      .pipe(
        tap(({ accessToken }: { accessToken: string }) => {
          this.setUserValueByToken({ accessToken });

          this.router.navigate(['/home/homepage']);
        }),
        catchError((error) => {
          return throwError('SomeThing Wrong during sign in!', error);
        })
      );
  }

  /* SignOut */
  logout() {
    localStorage.removeItem('access_token');

    this.stopRefreshTokenTimer();

    this.userSubject$.next({});
    this.router.navigate(['/welcome']);
  }

  /* SignUp */
  addUserInfo(userInfo: UserInfo) {
    this.appUserRegister = {
      ...this.appUserRegister,
      ...userInfo,
    };
  }
  sighup(userRole: { role: UserRole }): Observable<any> {
    this.appUserRegister = {
      ...this.appUserRegister,
      ...userRole,
    };
    const { username, pwd, email, role, tmdb_key } = this.appUserRegister;

    if (!username || !preserveWhitespacesDefault || !email || !role || !tmdb_key)
      return of('Register failed');

    return this.http
      .post<{ accessToken: string }>(
        [this.authServerPath, 'user', 'signup'].join('/'),
        this.appUserRegister
      )
      .pipe(
        tap(({ accessToken }: { accessToken: string }) => {
          this.setUserValueByToken({ accessToken });
          this.router.navigate(['/home/homepage']);
        }),
        catchError((error) => {
          return throwError('SomeThing Wrong during sign up!', error);
        })
      );
  }

  /* upgrade Uer Permission */
  upgradePermission(userRole: { role: UserRole }) {
    console.log('Change permission class to: ', userRole.role);
    this.stopRefreshTokenTimer();

    return this.http
      .patch<{ accessToken: string }>(
        [this.authServerPath, 'user', 'userupdate'].join('/'),
        userRole
      )
      .pipe(
        tap(({ accessToken }: { accessToken: string }) => {
          this.setUserValueByToken({ accessToken });
          this.router.navigate(['/home/homepage']);
        }),
        catchError((error) => {
          return throwError('SomeThing Wrong during sign up!', error);
        })
      );
  }

  // helper methods;
  refreshToken(): Observable<any> {
    const currentToken = localStorage.getItem('access_token');
    if (!currentToken) {
      this.router.navigate(['/']);
      return of('err');
    }

    const { id, username, email, role, tmdb_key } =
      this.jwtHelper.decodeToken(currentToken);
    const user = { id, username, email, role, tmdb_key };

    return this.http
      .post<any>(`${this.authServerPath}/user/refresh-token`, user)
      .pipe(
        tap(({ accessToken }: { accessToken: string }) => {
          this.setUserValueByToken({ accessToken });
        })
      );
  }
  private startRefreshTokenTimer(exp: string) {
    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(+exp * 1000);
    const timeout = expires.getTime() - Date.now();

    this.refreshTokenTimeout = setTimeout(() => {
      if (this.userValue.jwtToken) {
        this.refreshToken().subscribe();
      }
    }, timeout);
  }
  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }

  /* reuseable code in for signin, signup, refresh, update */
  private setUserValueByToken = ({ accessToken }: { accessToken: string }) => {
    localStorage.setItem('access_token', accessToken);

    const { id, username, email, role, tmdb_key, exp } =
      this.jwtHelper.decodeToken(accessToken);

    const user = {
      ...{ id, username, email, role, tmdb_key },
      jwtToken: accessToken,
    };
    this.userSubject$.next(user);
    this.startRefreshTokenTimer(exp);
  };
}
