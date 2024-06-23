import { Component, OnInit } from '@angular/core';
import {Item} from "../model/Item";
import {GatewayService, PagedResult} from "../service/gateway.service";
import {ExpenseDialogComponent} from "../expense-list/expense-dialog/expense-dialog.component";
import {Expense} from "../model/Expense";
import {ItemDialogComponent} from "./item-dialog/item-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  items: Item[];
  totalCount: number;
  page: number = 1;
  size: number = 10;
  pages: number[] = [];
  constructor(private gatewayService: GatewayService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    this.gatewayService.getAllItems(this.page, this.size).subscribe((data: PagedResult<Item>) => {
      this.items = data.items;
      this.totalCount = data.totalCount;
      this.calculatePages();
    });
  }

  calculatePages() {
    const totalPages = Math.ceil(this.totalCount / this.size);
    this.pages = Array.from({ length: totalPages }, (_, i ) => i + 1);
  }

  onPageChange(page: number) {
    this.page = page;
    this.loadItems();
  }

  openCreateModal(){
    const dialogRef = this.dialog.open(ItemDialogComponent, {
      width: '900px',
      data: { item: new Item() }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.confirmCreate(result);
      }
    });
  }

  confirmCreate(newItem: Item) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createItem(newItem);
      }
    });
  }

  createItem(newItem: Item) {
    this.gatewayService.createItem(newItem).subscribe(createdItem => {
      this.items.push(createdItem);
      this.loadItems();
    })
  }

  openEditModal(item: Item) {
    const dialogRef = this.dialog.open(ItemDialogComponent, {
      width: '900px',
      data: { ...item }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.confirmEdit(result);
      }
    });
  }

  confirmEdit(updatedItem: Item) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.editItem(updatedItem);
      }
    });
  }

  editItem(updatedItem: Item) {
    this.gatewayService.updateItem(updatedItem).subscribe(() => {
      const index = this.items.findIndex(itm => itm.id === updatedItem.id);
      this.items[index] = updatedItem;
    })
  }

  deleteItem(itemId: number) {
    this.gatewayService.deleteItemById(itemId).subscribe(() => {
      this.items = this.items.filter(item => item.id !== itemId);
    })
  }

}
