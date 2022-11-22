import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLogin!: boolean;
  username = '';
  loginDisplay = 'block'
  userAccountDisplay = 'block'
  constructor(
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    console.log(this.authService.userValue)
    const { jwtToken, username } = this.authService.userValue;
    if (jwtToken && username) {
      this.isLogin = true;
      this.username = username;
    } else {
      this.isLogin = false;
    }
  }

  signOut() {
    if (window.confirm("Do you want to log out?")) {
      this.authService.logout();
      this.isLogin = false;
      this.username = '';
    }
  }
}
