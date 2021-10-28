import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvenidasComponent } from './avenidas.component';

describe('AvenidasComponent', () => {
  let component: AvenidasComponent;
  let fixture: ComponentFixture<AvenidasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvenidasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvenidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
