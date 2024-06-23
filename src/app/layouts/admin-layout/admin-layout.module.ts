import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { ExpenseListComponent} from '../../expense-list/expense-list.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from "@angular/material/dialog";
import {ExpenseDialogComponent} from "../../expense-list/expense-dialog/expense-dialog.component";
import {TaskDialogComponent} from "../../dashboard/task-dialog/task-dialog.component";
import {ItemListComponent} from "../../item-list/item-list.component";
import {ItemDialogComponent} from "../../item-list/item-dialog/item-dialog.component";
import {ConfirmDialogComponent} from "../../confirm-dialog/confirm-dialog.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule
  ],
  declarations: [
    DashboardComponent,
    ExpenseListComponent,
    NotificationsComponent,
    ExpenseDialogComponent,
    TaskDialogComponent,
    ConfirmDialogComponent,
    ItemListComponent,
    ItemDialogComponent
  ]
})

export class AdminLayoutModule {}
