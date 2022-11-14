import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Home3CreditComponent } from './home3-credit.component';

describe('Home3CreditComponent', () => {
  let component: Home3CreditComponent;
  let fixture: ComponentFixture<Home3CreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Home3CreditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Home3CreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
