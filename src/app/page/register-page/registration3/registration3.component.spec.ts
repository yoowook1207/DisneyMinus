import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Registration3Component } from './registration3.component';

describe('Registration3Component', () => {
  let component: Registration3Component;
  let fixture: ComponentFixture<Registration3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Registration3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Registration3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
