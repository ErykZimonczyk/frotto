import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetBuyComponent } from './bet-buy.component';

describe('BetBuyComponent', () => {
  let component: BetBuyComponent;
  let fixture: ComponentFixture<BetBuyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetBuyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
