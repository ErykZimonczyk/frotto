import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetsCurrentComponent } from './bets-current.component';

describe('BetsCurrentComponent', () => {
  let component: BetsCurrentComponent;
  let fixture: ComponentFixture<BetsCurrentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetsCurrentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetsCurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
