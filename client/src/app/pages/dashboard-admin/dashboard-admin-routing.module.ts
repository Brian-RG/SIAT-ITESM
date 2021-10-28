import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeriodsComponent } from 'src/app/components/periods/periods.component';
import { ClassroomsComponent } from 'src/app/components/classrooms/classrooms.component';
//import { AvenuesComponent } from 'src/app/components/avenues/avenues.component';
import { AvenidasComponent } from 'src/app/components/avenidas/avenidas.component';
import { PeriodsAdminComponent } from 'src/app/components/periods-admin/periods-admin.component';

import { LayoutAdminComponent } from 'src/app/components/layout-admin/layout-admin.component';
import { ClassroomsAdminComponent } from 'src/app/components/classrooms-admin/classrooms-admin.component';
import { UserAdminComponent } from 'src/app/components/user-admin/user-admin.component';

//import { LayoutProfessorComponent } from 'src/app/components/layout-professor/layout-professor.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutAdminComponent,
    children: [
      {
        path: 'usuarios',
        component: UserAdminComponent
      },
      {
        path: 'avenida',
        component: AvenidasComponent
      },
      {
        path: 'periodos',
        component: PeriodsAdminComponent
      },
      {
        path: 'salones',
        component: ClassroomsAdminComponent
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DashboardRoutingModule { }
