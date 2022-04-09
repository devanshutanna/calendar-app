import { Pipe, PipeTransform } from '@angular/core';
import { CalenderEventModel } from '../types';

@Pipe({
  name: 'eventsBetween'
})
export class EventsBetweenPipe implements PipeTransform {

  transform(events: CalenderEventModel[], startDateTime: Date, endDateTime: Date): unknown {
    return null;
  }

}
