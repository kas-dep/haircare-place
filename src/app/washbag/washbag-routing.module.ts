import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WashbagComponent } from './washbag.component';

const washbagRoutes: Routes = [{
  path: '',
  component: WashbagComponent
}];

@NgModule({
  imports: [RouterModule.forChild(washbagRoutes)],
  exports: [RouterModule]
})
export class WashbagRoutingModule {}
