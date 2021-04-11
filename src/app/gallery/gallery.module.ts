import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryComponent } from './gallery.component';
import { SharedModule } from '../shared-module/shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ImgFormComponent } from './img-form/img-form.component';
import { MetamorphosisComponent } from './metamorphosis/metamorphosis.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageComponent } from './image/image.component';
import { GalleryRoutingModule } from './gallery-routing.module';


@NgModule({
  declarations: [GalleryComponent, ImgFormComponent, MetamorphosisComponent, ImageComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    GalleryRoutingModule
  ],
  exports: [GalleryComponent]
})
export class GalleryModule { }
