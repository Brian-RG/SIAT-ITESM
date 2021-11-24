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

  private colors:Array<string>;

  private mapped = new Map();

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

    //this.getAssignedGroups();

  }

  public changePeriod(data){
    if(data!==null){
      this.getAssignedGroups(data);
      this.colors=  ['#A1D6AF', '#F0F8FF', '#E0FFFF', '#F5DEB3', '#FFFFF0', 
      '#FFFAFA', '#F5FFFA', '#F0FFFF', '#F8F8FF', '#FAF0E6',
      '#FFF5EE', '#F0FFF0', '#FFE4C4', '#FFE4E1', '#FAEBD7'];
    }
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

  private getAssignedGroups(periodId){
    this.apiService.get(`/professors/horario/${this.professorId}/${periodId}`).subscribe(
      (response) => {
        if (response.status.statusCode === 200) {
          this.assignedGroups = response.result.tec20;
          this.assignedModules = response.result.tec21;
          console.log(response);
        } else {
          this.nzMessageService.error('Error al cargar programación del salón');
        }
      },
      (error) => {
        this.nzMessageService.error('Error al cargar programación del salón');
        console.log('Error al cargar programación del salón', error);
      }
    );
  }

  public getFlattenedAssignedGroups(){
    let allGroups = [];

    const mappedModules = this.assignedModules?.map((mod) => {
      mod.isModule = true;
      return mod;
    });

    allGroups = [...this.assignedGroups, ...mappedModules];

    allGroups = allGroups.filter((el) => {
      let initialWeek = null;
      let finalWeek = null;
      
      if(this.colors.length>0){
        let eventGroup;
        if(el.isModule){
          eventGroup = el.module21_groupId;
        }
        else{
          eventGroup = el.group20_id;
        }
        if(this.mapped.has(eventGroup)){
          el.colorcito = this.mapped.get(eventGroup)
        }
        else{
          let currColor = this.colors.pop();
          this.mapped.set(eventGroup, currColor);
          el.colorcito = currColor;
        }

      }
      else{
        el.colorcito="white";
      }


      if (el.isModule){
        initialWeek = el.course21_initialWeek;
        finalWeek = initialWeek + el.course21_weeks - 1;
      } else {
        initialWeek = el.course20_initialWeek;
        finalWeek = initialWeek + el.course20_weeks - 1;
      }

      return this.week >= initialWeek && this.week <= finalWeek;
    });

    return allGroups;
  }


  public onBack(){
    this.location.back();
  }


}
