import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/shared-module/confirmation/confirmation.component';
import { ActivitiesListService } from '../activities-list.service';
import { ActivitiesFormComponent } from '../activities-form/activities-form.component';
import { Activity } from '../activities.model';
import { ActivitiesListComponent } from '../activities-list.component';

@Component({
  selector: 'app-daily-activities-list',
  templateUrl: './daily-activities-list.component.html',
  styleUrls: ['./daily-activities-list.component.less'],
})
export class DailyActivitiesListComponent {
  source: Activity[] = this.data.dailyActivities.map((item) => ({
    id: item.id,
    productName: item.productName,
    coaLabel: item.title,
    date: item.date,
    productId: item.productId,
    courseOfActionId: item.courseOfActionId,
  }));
  day = this.source[0].date;
  displayedColumns = ['productName', 'coaLabel', 'action'];

  constructor(
    private activitiesListService: ActivitiesListService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ActivitiesListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  openDialog(isEditMode: boolean, activity): void {
    const dialog = this.dialog.open(ActivitiesFormComponent, {
      width: '50vw',
      data: {
        isEditMode,
        activity,
        dict: this.data.dict,
        products: this.data.availableProducts,
      },
    });
    dialog.afterClosed().subscribe((data) => {
      this.source = this.source
        .map((item) => (item.id === data.id ? data : item))
        .filter((item) => item.date === this.day);
      this.dialogRef.close(data);
    });
  }

  openConfirmationDialog(activityId: number): void {
    const dialog = this.dialog.open(ConfirmationComponent, {
      width: '35vw',
      data: {
        message: 'Czy na pewno chcesz usunąć wybraną aktywność?',
      },
    });
    dialog.afterClosed().subscribe((data) => {
      if (data === 'confirmed') {
        this.activitiesListService.deleteActivity(activityId).subscribe(() => {
          this.source = this.source.filter((item) => item.id !== activityId);
        });
      }
      this.dialogRef.close(data);
    });
  }
}
