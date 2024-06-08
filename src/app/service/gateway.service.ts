import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Profit} from "../model/Profit";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GatewayService {

  private host =environment.apiUrl
  constructor(private http: HttpClient) { }

  getProfit(): Observable<Profit> {
    return this.http.get<Profit>(`${this.host}/profit`)
  }
}
