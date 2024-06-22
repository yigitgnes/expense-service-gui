import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent {

  editForm: FormGroup;

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<TaskDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any)
  {
    this.editForm = this.fb.group({
      id: [data.id],
      description: [data.description, Validators.required],
      category: [data.category, Validators.required]
    })
  }

  onCancel(): void {
    this.dialogRef.close();
  }
  onEdit(): void {
    if (this.editForm.valid) {
      const updatedTask = this.editForm.value;
      this.dialogRef.close(updatedTask);
    }
  }



}
