import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetsHistoryComponent } from './bets-history.component';

describe('BetsHistoryComponent', () => {
  let component: BetsHistoryComponent;
  let fixture: ComponentFixture<BetsHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetsHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
