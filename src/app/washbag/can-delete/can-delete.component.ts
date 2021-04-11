import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { WashbagService } from '../washbag.service';

@Component({
  selector: 'app-can-delete',
  templateUrl: './can-delete.component.html',
  styleUrls: ['./can-delete.component.less']
})
export class CanDeleteComponent {
  constructor(
    private washbagService: WashbagService,
    public dialogRef: MatDialogRef<CanDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  deleteProduct(): void {
    this.washbagService.deleteProduct(this.data.product.id).subscribe((result) => {
      this.dialogRef.close(result);
    });
  }
}
