import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AuthNgrxService } from 'src/app/Ngrx/Auth/auth-ngrx.service';
import { UserRole } from 'src/app/services/interfaces/user-auth.interface';

@Component({
  selector: 'app-registration3',
  templateUrl: './registration3.component.html',
  styleUrls: ['./registration3.component.scss']
})
export class Registration3Component implements OnInit {
  selectedColumn!: 'USER' | 'SUPERUSER' | 'ADMIN';


  constructor(
    private readonly authService: AuthNgrxService,
    private readonly authServiceOrg: AuthService
  ) { }

  ngOnInit(): void {
  }

  selectPlan(user: 'USER' | 'SUPERUSER' | 'ADMIN') {
    this.selectedColumn = user;
    console.log(user)
  }

  handleNavigate() {
    const { jwtToken } = this.authServiceOrg.userValue;
    if (!this.selectedColumn) {
      alert('Select plan please!')
      return
    }
    if (jwtToken) {
      this.authServiceOrg.upgradePermission({
        role: UserRole[this.selectedColumn],
      })
      .subscribe();
    } else {
      this.authServiceOrg.signup({ role: UserRole[this.selectedColumn] }).subscribe();
    }
  }
}
