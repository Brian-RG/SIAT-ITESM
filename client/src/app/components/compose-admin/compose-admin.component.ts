import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { Administrators } from 'src/app/models/administrator.model';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'siat-compose-admin',
  templateUrl: './compose-admin.component.html',
  styleUrls: ['./compose-admin.component.scss']
})
export class ComposeAdminComponent implements OnInit {

  @Input() administrator: Administrators;
  @Input() isEditing: boolean;
  public loading: boolean;
  public administratorForm: FormGroup;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private nzModalRef: NzModalRef,
    private nzMessageService: NzMessageService
  ) { }

  ngOnInit(): void {
    if (this.administrator) {
      this.createFormWithProfessor();
    } else {
      this.createForm();
    }
  }

  private createForm(){
    this.administratorForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      nomina: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  private createFormWithProfessor(){
    this.administratorForm = this.formBuilder.group({
      name: [this.administrator.name, [Validators.required]],
      nomina: [this.administrator.nomina, [Validators.required]],
      email: [this.administrator.email, [Validators.required, Validators.email]],
      password: [this.administrator.password, [Validators.required]]
    });
    this.administratorForm.controls.nomina.disable();
  }

  public cancel(){
    this.nzModalRef.destroy();
  }

  public saveUser(){
    if (this.isEditing){
      this.editUser();
    } else {
      this.createUser();
    }
  }

  private createUser(){
    this.loading = true;
    let userJson = this.administratorForm.getRawValue();
    userJson.type='ADMIN';

    console.log(userJson);
    
    this.apiService.post('/auth/register', JSON.stringify(userJson)).subscribe(
      (response) => {
        this.loading = false;
        if (response.status?.statusCode === 201){
          this.nzMessageService.success('Usuario creado con éxito');
          this.nzModalRef.destroy({users: response.result});
        } else {
          console.log(response);
          this.nzMessageService.error('Ocurrió un error al crear el usuario');
        }
      },
      (error) => {
        this.loading = false;
        this.nzMessageService.error('Ocurrió un error al crear el usuario');
      }
    );
  }

  private editUser(){
    this.loading = true;
    this.apiService.put(`/usuarios/${this.administrator.id}`, this.administratorForm.value).subscribe(
      (response) => {
        this.loading = false;
        if (response.status?.statusCode === 200){
          this.nzMessageService.success('Usuario editado con éxito');
          this.nzModalRef.destroy({professor: response.result});
        } else {
          this.nzMessageService.error('Ocurrió un error al editar el usuario');
        }
      },
      (error) => {
        this.loading = false;
        this.nzMessageService.error('Ocurrió un error al editar el usuario');
      }
    );
  }

  public isArray(object: any): boolean{
    return Array.isArray(object);
  }
}
