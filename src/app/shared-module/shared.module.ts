import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort'
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DataLabelComponent } from './data-label/data-label.component';
import { HeaderComponent } from './header/header.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { DialogHeaderComponent } from './dialog-header/dialog-header.component';
import { ToastComponent } from './toast/toast.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { DictionaryPipe } from './pipes/dictionary.pipe';

@NgModule({
  declarations: [HeaderComponent, DataLabelComponent, StarRatingComponent, DialogHeaderComponent,
    ToastComponent, PageNotFoundComponent, DictionaryPipe, ConfirmationComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ],
  exports: [MatTableModule, MatIconModule, MatButtonModule, MatMenuModule, MatTooltipModule,
    HeaderComponent, MatPaginatorModule, MatSortModule, MatDialogModule, MatSelectModule, MatProgressSpinnerModule,
    MatInputModule, MatCheckboxModule, MatFormFieldModule, DataLabelComponent, ConfirmationComponent, StarRatingComponent,
    DialogHeaderComponent, ToastComponent, PageNotFoundComponent, DictionaryPipe]
})
export class SharedModule { }
