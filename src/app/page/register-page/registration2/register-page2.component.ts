import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserRole } from 'src/app/services/interfaces/user-auth.interface';

@Component({
  selector: 'app-register-page2',
  templateUrl: './register-page2.component.html',
  styleUrls: ['./register-page2.component.scss'],
})
export class RegisterPage2Component implements OnInit {
  selectedColumn: 'USER' | 'SUPERUSER' | 'ADMIN' = 'ADMIN';

  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {}

  nextStep() {

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