import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn :boolean = true;
  userAccountDisplay : string = " none";
  loginDisplay : string = "block";
  userName : string = "Sung"
  constructor() { }

  ngOnInit(): void {

    if(this.isLoggedIn) {
      this.userAccountDisplay = "block"
      this.loginDisplay = "none"
    } else {
      this.userAccountDisplay = "none"
      this.loginDisplay = "block"
    }
    
  }
}
