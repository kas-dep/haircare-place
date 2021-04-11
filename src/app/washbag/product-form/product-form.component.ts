import { Component, OnInit, Inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { WashbagService } from '../washbag.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataToDialog } from '../washbag-model';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.less'],
})
export class ProductFormComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private washbagService: WashbagService,
    private authService: AuthService,
    public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataToDialog
  ) {}

  form: FormGroup;
  rateChanged = false;
  header = '';
  saveButtonLabel = '';
  saveClick: () => void;
  valid = true;
  rate: number | null = null;

  ngOnInit(): void {
    this.loadDialog();
    this.form.valueChanges.subscribe(() => {
      this.valid = false;
    });
  }

  loadDialog(): void {
    if (this.data.isEditMode) {
      this.header = 'Edytuj wybrany produkt';
      this.saveButtonLabel = 'Zapisz';
      this.form = this.buildEditProductForm();
      this.rate = this.data.product.rate;
      this.saveClick = this.updateProduct;
    } else {
      this.header = 'Dodaj produkt do listy';
      this.saveButtonLabel = 'Dodaj';
      this.form = this.buildProductForm();
      this.saveClick = this.addProduct;
    }
  }

  buildProductForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      categoryId: null,
      courseOfActionId: '',
      rate: ['', Validators.required],
      availability: false,
      userId: this.authService.getUserId(),
    });
  }
  buildEditProductForm(): FormGroup {
    const { product } = this.data;
    return this.formBuilder.group({
      id: product.id,
      name: [product.name, [Validators.required, Validators.minLength(3)]],
      categoryId: product.categoryId,
      courseOfActionId: product.courseOfActionId,
      rate: product.rate,
      availability: product.availability,
      userId: product.userId,
    });
  }

  addProduct(): void {
    this.washbagService.addProduct(this.form.value).subscribe((result) => {
      this.dialogRef.close(result);
    });
  }

  updateProduct(): void {
    this.washbagService.updateProduct(this.form.value).subscribe((result) => {
      this.dialogRef.close(result);
    });
  }

  onRateChanged(rate): void {
    this.form.controls.rate.setValue(rate);
    this.rate = rate;
    this.rateChanged = true;
  }
}
