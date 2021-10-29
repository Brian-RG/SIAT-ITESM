import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorAdminComponent } from './professor-admin.component';

describe('ProfessorAdminComponent', () => {
  let component: ProfessorAdminComponent;
  let fixture: ComponentFixture<ProfessorAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessorAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
