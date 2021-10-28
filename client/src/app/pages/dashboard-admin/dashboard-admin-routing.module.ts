import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeriodsComponent } from 'src/app/components/periods/periods.component';
import { LayoutAdminComponent } from 'src/app/components/layout-admin/layout-admin.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutAdminComponent,
    children: [
      {
        path: 'periodos',
        component: PeriodsComponent,
      },
      {
        path: 'periodo',
        component: PeriodsComponent,
      },
      {
        path: 'Edificios',
        component: PeriodsComponent,
      },
      {
        path: 'Salones',
        component: PeriodsComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DashboardRoutingModule { }
