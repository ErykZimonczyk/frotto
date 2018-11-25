import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapGotoLocationComponent } from './map-goto-location.component';

describe('MapGotoLocationComponent', () => {
  let component: MapGotoLocationComponent;
  let fixture: ComponentFixture<MapGotoLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapGotoLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapGotoLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
