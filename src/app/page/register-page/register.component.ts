import { Component, Inject, OnInit } from '@angular/core';
// import { Title } from '@angular/platform-browser';
// import { ProdTitle } from 'src/app/core/core.module';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  constructor(
    // private readonly titleService: Title,
    // @Inject(ProdTitle) private readonly prodTitle: string
  ) {}

  ngOnInit(): void {
  }
}
