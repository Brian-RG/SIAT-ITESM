import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { elementAt } from 'rxjs/operators';
import { Classroom } from 'src/app/models/classroom.model';
import { Group20 } from 'src/app/models/group20.model';
import { ApiService } from 'src/app/services/api/api.service';
import { GroupAssignmentComponent } from '../group-assignment/group-assignment.component';

@Component({
  selector: 'siat-professorview',
  templateUrl: './professorview.component.html',
  styleUrls: ['./professorview.component.scss']
})
export class ProfessorviewComponent implements OnInit {
  private periodId: string;
  private professorId: string;

  public weeks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  public periods = [];
  public week = 1;
  public period;
  public loading: boolean;
  public remainingGroups: Array<Group20> = [];
  public remainingModules: Array<any> = [];
  public assignedGroups: Array<any> = [];
  public assignedModules: Array<any> = [];
  public classroom: Classroom;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private nzMessageService: NzMessageService,
    private nzModalService: NzModalService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.professorId = this.activatedRoute.snapshot.params.professorId;

    this.getPeriods();

  }

  public getPeriods(){
    this.apiService.get(`/periods`).subscribe(
      (response) => {
        if (response.status.statusCode === 200) {
          this.periods = response.result;
        } else {
          this.nzMessageService.error('Error al cargar salón');
        }
      },
      (error) => {
        this.nzMessageService.error('Error al cargar salón');
        console.log('Error al cargar salón', error);
      }
    );
  }


  public onBack(){
    this.location.back();
  }


}
