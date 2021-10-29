import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'siat-compose-admin',
  templateUrl: './compose-admin.component.html',
  styleUrls: ['./compose-admin.component.scss']
})
export class ComposeAdminComponent implements OnInit {

  administratorForm!: FormGroup;
  loading: boolean;
  @Input() administrator;
  @Input() isEditing;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private nzMessageService: NzMessageService,
    private nzModalRef: NzModalRef
  ) { }

  ngOnInit(): void {
    if (this.administrator){
      this.initializeEditForm();
    }else{
      this.initializeCreateForm();
    }
  }

  handleCancel(){
    this.nzModalRef.destroy();
  }

  handleOk(){
    if (this.isEditing){
      this.editAdministrator();
    }else{
      this.addAdministrator();
    }
  }

  addAdministrator(){
    this.loading = true;
    
    let userJson = this.administratorForm.getRawValue();
    userJson.type='Administrador';

    console.log(this.administratorForm.value);

    /*
    this.api.post(`/administrator`, {classrooms: [this.administratorForm.value]}).subscribe((res) => {
      this.loading = false;
      if (res.status?.statusCode === 201){
        this.nzMessageService.success('Salón creado con éxito');
        this.nzModalRef.destroy({classroom: res.result});
      }else {
        this.nzMessageService.error('Ocurrió un error al agregar el administrador');
      }
    }, (error) => {
      this.loading = false;
      this.nzMessageService.error('Ocurrió un error al agregar el administrador');
    }
    );

     */
    
  }

 

  editAdministrator(){
    this.loading = true;
    this.api.put(`/classrooms/${this.administrator.id}`, this.administratorForm.value).subscribe((res) => {
      this.loading = false;
      if (res.status?.statusCode === 200){
        this.nzMessageService.success('Salon editado con éxito');
        this.nzModalRef.destroy({classroom: res.result});
      }else {
        this.nzMessageService.error('Ocurrió un error al editar el administrador');
      }
    }, (error) => {
      console.log(error);
      this.loading = false;
      this.nzMessageService.error('Ocurrió un error al editar el administrador');
    }
    );
  }

  initializeCreateForm(){
    this.administratorForm = this.fb.group({
      name: [null, [Validators.required]],
      nomina: [this.administrator.nomina, [Validators.required]],
      email: [null, [Validators.required]],
      passowrd: [null, [Validators.required]]
    });
  }

  initializeEditForm(){
    this.administratorForm = this.fb.group({
      name: [this.administrator.nombre, [Validators.required]],
      nomina: [this.administrator.nomina, [Validators.required]],
      email: [this.administrator.correo, [Validators.required]],
      passowrd: [this.administrator.password, [Validators.required]],
    });
  }

}
