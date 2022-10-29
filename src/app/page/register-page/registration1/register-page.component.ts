import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  fromEmail: string = '';
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((params)=> {
      this.fromEmail = params.get('email') || '';
    })
  }

  onSubmit(formName: NgForm) {
    console.log(formName.valid)
    console.log(formName.touched)
    console.log(formName.pristine)
    console.log(formName.dirty)
  }

}