import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposeClassroomAdminComponent } from './compose-classroom-admin.component';

describe('ComposeClassroomAdminComponent', () => {
  let component: ComposeClassroomAdminComponent;
  let fixture: ComponentFixture<ComposeClassroomAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComposeClassroomAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComposeClassroomAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
