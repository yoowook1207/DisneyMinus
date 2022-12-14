import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { AppUserAuth, UserRole } from '../interfaces/user-auth.interface';
import { AppUser } from '../interfaces/user-login.interface';
import { MovieServiceService } from '../tmdb/movie-service.service';
import { AppUserRegister, UserInfo } from '../interfaces/user-signup.interface';
import { AuthDto } from '../interfaces/authDto.interface';
import { AUTHSERVER } from 'src/app/core/core.module';

@Injectable()
export class AuthService {
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
    private readonly movieService: MovieServiceService,
    @Inject(AUTHSERVER) private readonly authServerPath: string
  ) {
    this.userSubject$ = new BehaviorSubject<AppUserAuth>({});
    this.user$ = this.userSubject$.asObservable();
  }

  /* SignIn */
  login(appUser: AppUser): Observable<AuthDto> {
    return this.http
      .post<AuthDto>(`${this.authServerPath}/user/signin`, appUser)
      .pipe(
        tap(({ accessToken, role }: AuthDto) => {
          this.setUserValueByToken({ accessToken, role });
          this.router.navigate(['/home/homepage']);
        }),
        catchError(() => {
          return throwError(() => new Error('SomeThing Wrong during sign in!'));
        })
      );
  }

  /* SignOut */
  logout() {
    localStorage.removeItem('access_token');
    // this.movieService.setMyApiKey = '';

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
  signup(userRole: { role: UserRole }): Observable<AuthDto | string> {
    this.appUserRegister = {
      ...this.appUserRegister,
      ...userRole,
    };
    const { username, pwd, email, role, tmdb_key } = this.appUserRegister;
    if (!username || !pwd || !email || !role || !tmdb_key){
      console.log('failed!')
      return of('Register failed');
    }


    return this.http
      .post<AuthDto>(
        [this.authServerPath, 'user', 'register'].join('/'),
        this.appUserRegister
      )
      .pipe(
        tap(({ accessToken, role }: AuthDto) => {
          this.setUserValueByToken({ accessToken, role });
          this.router.navigate(['/home']);
        }),
        catchError((error) => {
          return throwError(() => new Error('SomeThing Wrong during sign up!'+ error));
        })
      );
  }

  /* upgrade Uer Permission */
  upgradePermission(userRole: { role: UserRole }): Observable<AuthDto> {
    console.log('Change permission class to: ', userRole.role);
    this.stopRefreshTokenTimer();

    return this.http
      .patch<AuthDto>(
        [this.authServerPath, 'user', 'userupdate'].join('/'),
        userRole
      )
      .pipe(
        tap(({ accessToken, role }: AuthDto) => {
          this.setUserValueByToken({ accessToken, role });
          this.router.navigate(['/movies']);
        }),
        catchError((error) => {
          return throwError('SomeThing Wrong during sign up!', error);
        })
      );
  }

  //* helper methods;
  refreshToken(): Observable<AuthDto | string> {
    const currentToken = localStorage.getItem('access_token');
    if (!currentToken) {
      this.router.navigate(['/']);
      return of('err');
    }

    const { id, username, email, tmdb_key } =
      this.jwtHelper.decodeToken(currentToken);
    const user = { id, username, email, tmdb_key };

    return this.http
      .post<AuthDto>(`${this.authServerPath}/user/refresh-token`, user)
      .pipe(
        tap(({ accessToken, role }: AuthDto) => {
          this.setUserValueByToken({ accessToken, role });
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
  private setUserValueByToken = ({ accessToken, role }: AuthDto) => {
    console.log('tokenGen')
    localStorage.setItem('access_token', accessToken);

    const { id, username, email, tmdb_key, exp } =
      this.jwtHelper.decodeToken(accessToken);

    // this.movieService.setMyApiKey = tmdb_key;

    const user = {
      ...{ id, username, email, role, tmdb_key },
      jwtToken: accessToken,
    };
    console.log(user)
    this.userSubject$.next(user);
    this.startRefreshTokenTimer(exp);
  };
}
