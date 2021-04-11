import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivitiesListComponent } from './activities-list.component';
import { SharedModule } from '../shared-module/shared.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ActivitiesFormComponent } from './activities-form/activities-form.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivitiesListRoutingModule } from './activities-list-routing.module';
import { DailyActivitiesListComponent } from './daily-activities-list/daily-activities-list.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    ActivitiesListComponent,
    ActivitiesFormComponent,
    DailyActivitiesListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FullCalendarModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    FormsModule,
    MatTooltipModule,
    ActivitiesListRoutingModule,
  ],
  exports: [
    ActivitiesListComponent,
    ActivitiesFormComponent,
    DailyActivitiesListComponent,
  ],
})
export class ActivitiesListModule {}
