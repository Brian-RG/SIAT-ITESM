import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleProfessorComponent } from './schedule-professor.component';

describe('ScheduleProfessorComponent', () => {
  let component: ScheduleProfessorComponent;
  let fixture: ComponentFixture<ScheduleProfessorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleProfessorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
