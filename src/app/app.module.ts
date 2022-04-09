import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedMaterialModule } from './shared-material/shared-material.module';
import { LeftIndentLevelPipe } from './pipes/left-indent-level.pipe';
import { EventsBetweenPipe } from './pipes/events-between.pipe';
import { EventComponent } from './components/event/event.component';
import { AddEventDialogComponent } from './components/add-event-dialog/add-event-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LeftIndentLevelPipe,
    EventsBetweenPipe,
    EventComponent,
    AddEventDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedMaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
