import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'siat-compose-user-admin',
  templateUrl: './compose-user-admin.component.html',
  styleUrls: ['./compose-user-admin.component.scss']
})
export class ComposeUserComponent implements OnInit {

  @Input() user: User;
  @Input() isEditing: boolean;
  public loading: boolean;
  public userForm: FormGroup;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private nzModalRef: NzModalRef,
    private nzMessageService: NzMessageService
  ) { }

  ngOnInit(): void {
    if (this.user) {
      this.createFormWithProfessor();
    } else {
      this.createForm();
    }
  }

  private createForm(){
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      nomina: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  private createFormWithProfessor(){
    this.userForm = this.formBuilder.group({
      name: [this.user.name, [Validators.required]],
      nomina: [this.user.nomina, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
      password: [this.user.password, [Validators.required]]
    });
    this.userForm.controls.nomina.disable();
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
    let userJson = this.userForm.getRawValue();
    userJson.type='DIRECTOR';
    
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
    this.apiService.put(`/usuarios/${this.user.id}`, this.userForm.value).subscribe(
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
