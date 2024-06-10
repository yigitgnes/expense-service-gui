import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Profit} from "../model/Profit";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Expense} from "../model/Expense";

@Injectable({
  providedIn: 'root'
})
export class GatewayService {

  private host =environment.apiUrl
  constructor(private http: HttpClient) { }

  //APIs to full-fill charts
  getProfit(): Observable<Profit> {
    return this.http.get<Profit>(`${this.host}/profit`)
  }

  getMonthlySales(): Observable<{ month: string, count: number }[]> {
    return this.http.get<{ month: string, count: number }[]>(`${this.host}/item/sales/monthly`);
  }

  getMonthlyEarning(): Observable<{ month: string, count: number }[]> {
    return this.http.get<{ month: string, count: number }[]>(`${this.host}/item/earning/monthly`);
  }

  getMonthlyExpense(): Observable<{ month: string, count: number }[]> {
    return this.http.get<{ month: string, count: number }[]>(`${this.host}/expense/monthly`);
  }

  //Expense APIs
  getAllExpensenses(page: number, size: number): Observable<PagedResult<Expense>> {
    const params = new HttpParams()
        .set('page', page.toString())
        .set('size', size.toString());
    return this.http.get<PagedResult<Expense>>(`${this.host}/expense`, { params });
  }

  updateExpense(expense: Expense): Observable<Expense> {
    return this.http.put<Expense>(`${this.host}/expense`, expense);
  }
  deleteExpenseById(expenseId: number): Observable<void> {
    return this.http.delete<void>(`${this.host}/expense/${expenseId}`);
  }
}

export interface PagedResult<T> {
  items: T[];
  page: number;
  size: number;
  totalCount: number;
}
