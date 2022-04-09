import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { combineLatest, Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { AddEventDialogComponent } from './components/add-event-dialog/add-event-dialog.component';
import { EventsStorageService } from './services/events-storage.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

type CalenderRow = {
  events?: Record<string, string>;
  data: Record<string, string>;
};


enum CalenderViewType {
  Day = 'day',
  Week = 'week',
  Month = 'month',
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  calenderViewControl = new FormControl(CalenderViewType.Week);
  startDate = new FormControl();

  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // dataSource = ELEMENT_DATA;

  readonly columns$: Observable<string[]>;
  readonly rowData$: Observable<CalenderRow[]>;

  readonly columnWidth$: Observable<string | null>;

  readonly events$ = this.eventsStorageService.events$;

  constructor(
    private readonly eventsStorageService: EventsStorageService,
    public dialog: MatDialog,
  ) {

    const date = new Date();
    date.setDate(date.getDate() - (date.getDay()||7));
    this.startDate.setValue(date);

    const calenderViewType$: Observable<CalenderViewType> = this.calenderViewControl.valueChanges.pipe(
      startWith(this.calenderViewControl.value),
    );

    const startDate$: Observable<Date> = this.startDate.valueChanges.pipe(
      startWith(this.startDate.value),
    );

    this.columns$ = combineLatest([
      calenderViewType$,
      startDate$,
    ]).pipe(
      tap(v => console.log(v)),
      map(([viewType, startDate]) => {
        switch (viewType) {
          case CalenderViewType.Day:
          case CalenderViewType.Month:
            return [];
          case CalenderViewType.Week:
            return [
              " ",
              ...new Array(7).fill(null).map((_, index) => {
                const date = new Date(startDate);

                date.setDate(startDate.getDate() + index);
                return `${date.getDate()}/${date.getMonth()}`;
              })
            ];
        }
      }),
      tap(v => console.log(v)),
    );

    this.rowData$ = combineLatest([
      calenderViewType$,
      this.columns$,
    ]).pipe(
      map(([viewType, columns]) => {
        switch (viewType) {
          case CalenderViewType.Day:
          case CalenderViewType.Month:
            return [];
          case CalenderViewType.Week:
            return new Array(24).fill(null).map((_, index) => ({
              data: {
                " ": `${index%12 + 1}${index > 12 ? 'pm' : 'am'}`,
              }
            }));
        }
      }),
    );

    this.columnWidth$ = this.columns$.pipe(
      map(columns => columns.length ? `${100/columns.length}%` : null),
    );
  }

  addEvent(): void {
    const dialogRef = this.dialog.open(AddEventDialogComponent, {
      width: '250px',
      // data: {name: this.name, animal: this.animal},
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
  }

}
