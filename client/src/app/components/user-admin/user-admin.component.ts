import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';

//import { Professor } from 'src/app/models/professor.model';

import { Users } from 'src/app/models/users.model';

import { ApiService } from 'src/app/services/api/api.service';

import { ComposeProfessorComponent } from '../compose-professor/compose-professor.component';
import { ComposeUserComponent } from '../compose-user-admin/compose-user-admin.component';


@Component({
  selector: 'siat-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.scss']
})
export class UserAdminComponent implements OnInit {

  public columnsToDisplay = [
    {display: 'Correo', prop: 'email'},
    {display: 'Nomina', prop: 'nomina'},
    {display: 'Nombre', prop: 'name'},
    {display: 'Password', prop: 'password'},
  ];
  public users: Array<Users>;
  public loading: boolean;

  constructor(
    private apiService: ApiService,
    private nzMessageService: NzMessageService,
    private nzModalService: NzModalService
  ) {
    this.loading = true;
    this.apiService.get('/usuarios').subscribe(
      (response) => {
        this.loading = false;
        if (response.status?.statusCode === 200){
          this.users = response.result;
        } else {
          this.nzMessageService.error('Error al cargar usuarios');
        }
      },
      (error) => {
        this.loading = false;
        this.nzMessageService.error('Error al cargar usuarios');
        console.log('Error al cargar usuarios', error);
      }
    );
  }

  ngOnInit(): void {
  }

  public createUser(){
    const modal = this.nzModalService.create({
      nzTitle: 'Agregar Usuario',
      nzContent: ComposeUserComponent,
      nzStyle: {width: '80vw'},
    });

    modal.afterClose.subscribe(
      (result) => {
        if (result){
          let data = [];
          data.push(result.users);
          this.users = [
            ... data,
            ...this.users
          ]
        }
      }
    );

    /*
    modal.afterClose.subscribe(
      (result) => {
        if (result?.professors){
          this.users = [
            ...result.professors,
            ...this.users
          ];
        }
      }
    );
    */
  }

  public afterCsvSuccess(data){
    this.users = [...data, ...this.users];
  }

  public onDelete(id){
    this.showDeleteConfirmation(id);
  }

  private showDeleteConfirmation(id){
    this.nzModalService.confirm({
      nzTitle: 'Borrar Usuario',
      nzContent: '<span style="color: red;">Seguro que deseas borrar este usuario?</span>',
      nzOkText: 'Borrar',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.deleteProfessor(id);
      },
      nzCancelText: 'Cancelar',
    });
  }

  private deleteProfessor(id){
    this.loading = true;
    this.apiService.delete(`/professors/${id}`).subscribe(
      (response) => {
        this.loading = false;
        if (response.status?.statusCode === 200){
          this.users = this.users.filter(professor => professor.id !== id);
          this.nzMessageService.success('Maestro borrado con éxito');
        } else {
          this.nzMessageService.error('Ocurrió un error al borrar el maestro');
        }
      },
      (error) => {
        this.loading = false;
        console.error('Ocurrió un error al borrar el maestro', error);
        this.nzMessageService.error('Ocurrió un error al borrar el maestro');
      }
    );
  }

  public onEdit(data){
    const modal = this.nzModalService.create({
      nzTitle: 'Editar Maestro',
      nzContent: ComposeProfessorComponent,
      nzStyle: {width: '80vw'},
      nzComponentParams: {professor: data, isEditing: true}
    });

    modal.afterClose.subscribe(
      (result) => {
        if (result?.professor){
          const index = this.users.findIndex(professor => professor.id === result.professor.id);
          Object.assign(this.users[index], result.professor);
        }
      }
    );
  }
}
