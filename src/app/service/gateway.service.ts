import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Profit} from "../model/Profit";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Expense} from "../model/Expense";
import {Task} from "../model/Task";

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

  //EXPENSE APIS
  getAllExpensenses(page: number, size: number): Observable<PagedResult<Expense>> {
    const params = new HttpParams()
        .set('page', page.toString())
        .set('size', size.toString());
    return this.http.get<PagedResult<Expense>>(`${this.host}/expense`, { params });
  }
  createExpense(espense: Expense): Observable<Expense> {
    return this.http.post<Expense>(`${this.host}/expense`, espense);
  }
  updateExpense(expense: Expense): Observable<Expense> {
    return this.http.put<Expense>(`${this.host}/expense`, expense);
  }
  deleteExpenseById(expenseId: number): Observable<void> {
    return this.http.delete<void>(`${this.host}/expense/${expenseId}`);
  }
  // TASK APIS
  getAllTasks(category?: string): Observable<Task[]> {
    let params = new HttpParams();
    if (category) {
      params = params.set('category', category);
    }
    return this.http.get<Task[]>(`${this.host}/tasks`, {params});
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.host}/tasks/${id}`);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.host}/tasks`, task);
  }

  updateTask(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.host}/tasks/${id}`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.host}/tasks/${id}`);
  }
}

export interface PagedResult<T> {
  items: T[];
  page: number;
  size: number;
  totalCount: number;
}
