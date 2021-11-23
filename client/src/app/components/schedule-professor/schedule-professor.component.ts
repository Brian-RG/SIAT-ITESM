import { Component, EventEmitter, Input, OnChanges, OnInit, Output ,ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'siat-schedule-professor',
  templateUrl: './schedule-professor.component.html',
  styleUrls: ['./schedule-professor.component.scss'],
})
export class ScheduleProfessorComponent implements OnInit, OnChanges{
  @Input() events: Array<any>;
  @Input() week: number;
  @Output() deleteGroupEvent = new EventEmitter<any>();
  @Output() deleteModuleEvent = new EventEmitter<any>();

  public hourKeyIndexes: Array<Array<any>> = [[], [], [], [], [], []];
  private dayEvents: Array<Array<any>> = [[], [], [], [], [], []];
  public visiblePopover: boolean;

  constructor(private cdRef:ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngOnChanges(): void{
    this.createHourKeyIndexes();
    if (this.events) {
      //console.log(this.events);
      this.getDayEvents();
      this.assignDayEventsToHours();


      //console.log(this.dayEvents);
    }
  }

  public setStyle(value: string): unknown {
    console.log(value);
    if (value == "") return null;
    //Example: value = "background-color:blue";
    var properties = value.split(";");
    var keyValuePairs = {};
    properties.forEach(o => {
      var key = String(o.split(":")[0]).trim();
      var value = String(o.split(":")[1]).trim();
      if (key.length > 0) {
        keyValuePairs[key] = value;
      }
    })
    console.log("keyValuePairs: " + JSON.stringify(keyValuePairs));
    return keyValuePairs;
  }



  public getDayEvents() {
    for (let i = 0; i < 6; i++) {
      this.dayEvents[i] = this.events.filter((element) => {
        return element.event_weekDay === i;
      });
    }
  }

  private createHourKeyIndexes() {
    for (let i = 0; i < 6; i++) {
      let hour = 7;
      let halfHour = false;
      for (let j = 0; j < 30; j++) {
        if (halfHour) {
          this.hourKeyIndexes[i][hour + ':' + '30'] = null;
          halfHour = false;
          hour++;
        } else {
          this.hourKeyIndexes[i][hour + ':' + '00'] = null;
          halfHour = true;
        }
      }
    }
  }

  private getHourSpan(event: any){
    let startTime = event.event_startTimeString;
    const endTime = event.event_endTimeString;
    const hourSpan = [];

    while (startTime !== endTime){
      const splitTime = startTime.split(':');
      const hour = Number.parseInt(splitTime[0], 10);
      const minutes = Number.parseInt(splitTime[1], 10);
      hourSpan.push(hour + ':' + (minutes === 0 ? '00' : '30'));
      if (splitTime[1] === '30'){
        startTime = (hour + 1) + ':00';
      } else {
        startTime = hour + ':30';
      }
    }
    return hourSpan;
  }

  private assignDayEventsToHours(){
    for (const [i, day] of this.dayEvents.entries()) {
      for (const event of day) {
        for (const hour of this.getHourSpan(event)){
          this.hourKeyIndexes[i][hour] = event;
        }
      }
    }
  }

  public getHours(){
    return Object.keys(this.hourKeyIndexes[0]);
  }

  public deleteGroup(event){
    this.deleteGroupEvent.emit(event);
  }

  public deleteModule(event){
    this.deleteModuleEvent.emit(event);
  }
}
