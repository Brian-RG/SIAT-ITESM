import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposePeriodAdminComponent } from './compose-period-admin.component';

describe('ComposePeriodAdminComponent', () => {
  let component: ComposePeriodAdminComponent;
  let fixture: ComponentFixture<ComposePeriodAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComposePeriodAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComposePeriodAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
