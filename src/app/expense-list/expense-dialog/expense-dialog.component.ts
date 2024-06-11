import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-expense-dialog',
  templateUrl: './expense-dialog.component.html',
  styleUrls: ['./expense-dialog.component.scss']
})
export class ExpenseDialogComponent {

  editForm: FormGroup;

  constructor(
      private fb: FormBuilder,
      public dialogRef: MatDialogRef<ExpenseDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.editForm = this.fb.group({
      id: [data.id],
      name: [data.name, Validators.required],
      description: [data.description, Validators.required],
      expenseDate: [data.expenseDate ? this.formatDate(data.expenseDate) : '', Validators.required],
      price: [data.price, [Validators.required, Validators.min(0)]]
    });
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
      const updatedExpense = this.editForm.value;
      updatedExpense.expenseDate = this.formatDateTime(updatedExpense.expenseDate);
      this.dialogRef.close(updatedExpense);
    }
  }
}
