import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-item-dialog',
  templateUrl: './item-dialog.component.html',
  styleUrls: ['./item-dialog.component.scss']
})
export class ItemDialogComponent {

  editForm: FormGroup;

  constructor(
      private fb: FormBuilder,
      public dialogRef: MatDialogRef<ItemDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.data.sale = this.data.sale || { purchasePrice: null, purchaseDate: null, salePrice: null, saleDate: null };
    this.editForm = this.fb.group({
      id: [data.id],
      name: [data.name, Validators.required],
      purchasePrice: [data.sale.purchasePrice, [Validators.required, Validators.min(0)]],
      purchaseDate: [data.sale.purchaseDate ? this.formatDate(data.sale.purchaseDate): '', Validators.required],
      salePrice: [data.sale.salePrice ? data.sale.salePrice : ''],
      saleDate: [data.sale.saleDate ? this.formatDate(data.sale.saleDate) : '']
    })
  }

  formatDate(date: string): string {
    const d = new Date(date);
    return `${d.getFullYear()}-${this.pad(d.getMonth() + 1)}-${this.pad(d.getDate())}`;
  }

  formatDateTime(date: string): string {
    const d = new Date(date);
    return `${d.getFullYear()}-${this.pad(d.getMonth() + 1)}-${this.pad(d.getDate())}T00:00:00.000Z`;
  }

  pad(number: number): string {
    return number < 10 ? '0' + number : number.toString();
  }
  onCancel(): void {
    this.dialogRef.close();
  }

  onEdit(): void {
    if (this.editForm.valid) {
      const updatedItem = this.editForm.value;
      updatedItem.sale.saleDate = this.formatDateTime(updatedItem.sale.saleDate);
      updatedItem.sale.purchaseDate = this.formatDateTime(updatedItem.sale.purchaseDate);
      this.dialogRef.close(updatedItem);
    }
  }

}
