import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposeAdminComponent } from './compose-admin.component';

describe('ComposeAdminComponent', () => {
  let component: ComposeAdminComponent;
  let fixture: ComponentFixture<ComposeAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComposeAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComposeAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
