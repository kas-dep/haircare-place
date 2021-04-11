import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WashbagComponent } from './washbag.component';
import { SharedModule } from '../shared-module/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductFormComponent } from './product-form/product-form.component';
import { CanDeleteComponent } from './can-delete/can-delete.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { WashbagRoutingModule } from './washbag-routing.module';

@NgModule({
  declarations: [WashbagComponent, ProductFormComponent, CanDeleteComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    MatTooltipModule,
    WashbagRoutingModule
  ],
  exports: [WashbagComponent]
})
export class WashbagModule { }
