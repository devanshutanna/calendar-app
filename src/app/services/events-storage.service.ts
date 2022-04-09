import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CalenderEventModel } from '../types';

@Injectable({
  providedIn: 'root'
})
export class EventsStorageService {

  private _events$ = new BehaviorSubject<CalenderEventModel[]>([{
    startDateTime: new Date(2022, 3, 8, 7),
    endDateTime: new Date(2022, 3, 8, 16),
    description: "Test",
  }]);
  public events$ = this._events$.asObservable();

  addEvent(event: CalenderEventModel): void {
    const newEvents = [...this._events$.value, event];
    this._events$.next(newEvents);
  }

  removeEvent(index: number): void {
    const newEvents = [...this._events$.value];
    newEvents.slice(index);
    this._events$.next(newEvents);
  }

  constructor() { }
}
