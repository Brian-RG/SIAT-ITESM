import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAdminComponent } from './table-admin.component';

describe('TableAdminComponent', () => {
  let component: TableAdminComponent;
  let fixture: ComponentFixture<TableAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Working delete output', () => {
    it('should emit a value', () => {
      component.deleteRow({});
      spyOn(component.delete, 'emit').and.callThrough();
      component.deleteRow({});
      expect(component.delete.emit).toHaveBeenCalled();
    });
  });

  describe('Working edit output', () => {
    it('should emit a value', () => {
      component.editRow({});
      spyOn(component.edit, 'emit').and.callThrough();
      component.editRow({});
      expect(component.edit.emit).toHaveBeenCalled();
    });
  });
});
