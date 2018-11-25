import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetConfirmationComponent } from './bet-confirmation.component';

describe('BetConfirmationComponent', () => {
  let component: BetConfirmationComponent;
  let fixture: ComponentFixture<BetConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
