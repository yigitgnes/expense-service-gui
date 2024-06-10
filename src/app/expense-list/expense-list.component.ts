import { Component, OnInit } from '@angular/core';
import {GatewayService, PagedResult} from "../service/gateway.service";
import {Expense} from "../model/Expense";
import {MatDialog} from "@angular/material/dialog";
import {EditExpenseDialogComponent} from "./edit-expense-dialog/edit-expense-dialog.component";
import {ConfirmDialogComponent} from "./confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {

  expenses: Expense[];
  totalCount: number;
  page: number = 1;
  size: number = 10;
  pages: number[] = [];

  constructor(private gatewayService: GatewayService, public dialog: MatDialog) { }

  ngOnInit() {
    this.loadExpenses();
  }

  loadExpenses() {
    this.gatewayService.getAllExpensenses(this.page, this.size).subscribe((data: PagedResult<Expense>) => {
      this.expenses = data.items;
      this.totalCount = data.totalCount;
      this.calculatePages();
    })
  }

  calculatePages() {
    const totalPages = Math.ceil(this.totalCount / this.size);
    this.pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  openEditModal(expense: Expense) {
    const dialogRef = this.dialog.open(EditExpenseDialogComponent, {
      width: '500px',
      data: { ...expense }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.confirmEdit(result);
      }
    });
  }

  confirmEdit(updatedExpense: Expense) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.editExpense(updatedExpense);
      }
    });
  }

  editExpense(updatedExpense: Expense) {
    this.gatewayService.updateExpense(updatedExpense).subscribe(() => {
      const index = this.expenses.findIndex(exp => exp.id === updatedExpense.id);
      this.expenses[index] = updatedExpense;
    });
  }

  deleteExpense(expenseId: number) {
    this.gatewayService.deleteExpenseById(expenseId).subscribe(() => {
      this.expenses = this.expenses.filter(expense => expense.id !== expenseId);
    })
  }

  onPageChange(page: number) {
    this.page = page;
    this.loadExpenses();
  }
}
