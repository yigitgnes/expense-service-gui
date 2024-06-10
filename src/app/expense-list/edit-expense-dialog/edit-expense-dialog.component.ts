import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-edit-expense-dialog',
  templateUrl: './edit-expense-dialog.component.html',
  styleUrls: ['./edit-expense-dialog.component.scss']
})
export class EditExpenseDialogComponent {

  editForm: FormGroup;

  constructor(
      private fb: FormBuilder,
      public dialogRef: MatDialogRef<EditExpenseDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.editForm = this.fb.group({
      id: [data.id],
      name: [data.name],
      description: [data.description],
      expenseDate: [data.expenseDate ? this.formatDate(data.expenseDate) : ''],
      price: [data.price]
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
    const updatedExpense = this.editForm.value;
    updatedExpense.expenseDate = this.formatDateTime(updatedExpense.expenseDate); // Reformat the date before sending
    this.dialogRef.close(updatedExpense);
  }

}
