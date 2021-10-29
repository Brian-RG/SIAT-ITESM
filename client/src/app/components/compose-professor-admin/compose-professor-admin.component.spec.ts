import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposeProfessorAdminComponent } from './compose-professor-admin.component';

describe('ComposeProfessorAdminComponent', () => {
  let component: ComposeProfessorAdminComponent;
  let fixture: ComponentFixture<ComposeProfessorAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComposeProfessorAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComposeProfessorAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
