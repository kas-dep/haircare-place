import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { SharedModule } from '../shared-module/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { EditDataFormComponent } from './edit-data-form/edit-data-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core-module/core.module';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [UserComponent, EditDataFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule,
    ReactiveFormsModule,
    CoreModule,
    UserRoutingModule
  ],
  exports: [UserComponent]
})
export class UserModule { }
