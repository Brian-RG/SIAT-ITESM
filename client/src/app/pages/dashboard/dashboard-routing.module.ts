import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutProfessorComponent } from 'src/app/components/layout-professor/layout-professor.component';
import { PeriodsComponent } from 'src/app/components/periods/periods.component';
import { ProfessorviewComponent } from 'src/app/components/professorview/professorview.component';
//import { ScheduleProfessorComponent } from 'src/app/components/schedule-professor/schedule-professor.component';
import { LayoutComponent } from 'src/app/components/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutProfessorComponent,
    children: [
      {
        path: 'periodos',
        component: PeriodsComponent,
      },
      {
        path: 'horarios',
        component: ProfessorviewComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DashboardRoutingModule { }
