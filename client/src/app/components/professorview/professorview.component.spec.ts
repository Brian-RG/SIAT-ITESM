import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorviewComponent } from './professorview.component';

describe('ProfessorviewComponent', () => {
  let component: ProfessorviewComponent;
  let fixture: ComponentFixture<ProfessorviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessorviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
