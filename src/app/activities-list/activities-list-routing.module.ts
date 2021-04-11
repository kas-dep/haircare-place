import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivitiesListComponent } from './activities-list.component';

const activitiesListRoutes: Routes = [
  {path: '', component: ActivitiesListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(activitiesListRoutes)],
  exports: [RouterModule]
})
export class ActivitiesListRoutingModule {}