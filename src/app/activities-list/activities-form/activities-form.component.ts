import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivitiesListComponent } from '../activities-list.component';
import { ProductOption } from '../activities.model';
import { ActivitiesListService } from '../activities-list.service';
import { AuthService } from 'src/app/auth/auth.service';
import { DictData } from 'src/app/model/common.model';
import { CommonResponse } from '../activities.model';
import { Activity } from '../activities.model';

@Component({
  selector: 'app-activities-form',
  templateUrl: './activities-form.component.html',
  styleUrls: ['./activities-form.component.less'],
})
export class ActivitiesFormComponent implements OnInit {
  constructor(
    private activitiesListService: ActivitiesListService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public dialogRef: MatDialogRef<ActivitiesListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  today = new Date().toISOString().slice(0, 10);
  form: FormGroup;
  header = '';
  saveClick: () => void;
  coaDict: DictData[];
  userId = this.authService.getUserId();
  options: ProductOption[] = this.data.products.map((item) => ({
    label: item.name,
    value: item.id,
    courseOfActionId: item.courseOfActionId,
  }));
  filteredOptions: Observable<ProductOption[]>;

  ngOnInit(): void {
    this.coaDict = this.data.dict;
    this.loadDialog();
    this.filteredOptions = this.form.controls.productName.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  loadDialog(): void {
    if (this.data.isEditMode) {
      this.header = 'Edytuj wybraną aktywność';
      this.form = this.buildEditActivityForm();
      this.saveClick = this.updateActivity;
    } else {
      this.header = 'Zarejestruj swoją aktywność';
      this.form = this.buildActivityForm();
      this.saveClick = this.addActivity;
    }
  }

  buildActivityForm(): FormGroup {
    return this.formBuilder.group({
      date: [this.today, [Validators.required]],
      productId: null,
      productName: ['', [Validators.required]],
      courseOfActionId: '',
      coaLabel: '',
      userId: this.userId,
    });
  }
  buildEditActivityForm(): FormGroup {
    return this.formBuilder.group({
      id: this.data.activity.id,
      date: this.data.activity.date,
      productId: this.data.activity.productId,
      productName: this.data.activity.productName,
      courseOfActionId: this.data.activity.courseOfActionId,
      coaLabel: this.data.activity.coaLabel,
      userId: this.userId,
    });
  }
  addActivity(): void {
    const activity: Activity = this.form.value;
    delete activity.productName;
    delete activity.coaLabel;
    this.activitiesListService
      .addActivity(this.form.value)
      .subscribe((result) => {
        this.dialogRef.close(result);
      });
  }

  updateActivity(): void {
    const activity: Activity = this.form.value;
    this.activitiesListService
      .updateActivity(activity)
      .subscribe((result: CommonResponse) => {
        if (!result.error) {
          this.dialogRef.close(activity);
        }
        this.dialogRef.close(activity);
      });
  }

  selectedProduct(e): void {
    const selectedProduct = this.options.find(
      (item) => item.label === e.option.value
    );
    this.form.controls.courseOfActionId.setValue(
      selectedProduct ? selectedProduct.courseOfActionId : null
    );
    this.form.controls.productId.setValue(
      selectedProduct ? selectedProduct.value : null
    );
    this.form.controls.coaLabel.setValue(
      selectedProduct ? this.showLabel(selectedProduct.courseOfActionId) : null
    );
  }
  showLabel(productId: number): string {
    const matchedCoa = this.coaDict.find((item) => {
      if (item.id === productId) { return item; }
    });
    return matchedCoa.label;
  }

  private _filter(value: string): ProductOption[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option) =>
      option.label.toLowerCase().includes(filterValue)
    );
  }
}
