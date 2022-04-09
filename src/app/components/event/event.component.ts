import { Component, Input, OnInit } from '@angular/core';
import { CalenderEventModel } from 'src/app/types';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  @Input() event!: CalenderEventModel;

  left!: string | number;
  top!: string | number;
  width!: string | number;
  height!: string | number;

  ngOnInit(): void {
    this.left = `${100 * (this.event.startDateTime.getDay() + 1)/(7 + 1)}%`;
    this.top = `${100 * (this.event.startDateTime.getHours())/(24 + 1)}%`;
    this.width = `${100 * 1/8}%`;
    this.height = `${100 *
      ( this.event.endDateTime.getHours() - this.event.startDateTime.getHours() + 1 ) / 25
    }%`;
  }

}
