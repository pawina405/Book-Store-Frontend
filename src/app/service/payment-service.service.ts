import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';

const API_ENDPOINT = environment.API_ENDPOINT;
const httpoption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class PaymentServiceService {
  constructor(private http: HttpClient) {}

  getAllPayments(): Observable<any> {
    return this.http.get(API_ENDPOINT.concat('payment/getAll'));
  }

  getPaymentById(id: number): Observable<any> {
    return this.http.get(
      API_ENDPOINT.concat('payment/getById/' + id),
      httpoption
    );
  }

  savePayment(data: any): Observable<any> {
    const body = JSON.stringify(data);
    return this.http.post(
      API_ENDPOINT.concat('payment/save'),
      body,
      httpoption
    );
  }

  updatePayment(id: number, userDto: any): Observable<any> {
    const body = JSON.stringify(userDto);
    return this.http.put(
      API_ENDPOINT.concat('payment/update/' + id),
      body,
      httpoption
    );
  }

  deletePayment(id: number): Observable<any> {
    return this.http.delete(
      API_ENDPOINT.concat('payment/delete/' + id),
      httpoption
    );
  }

  registerPayment(data: FormData): Observable<any> {
    return this.http.post(API_ENDPOINT.concat('payment/payment'), data);
  }
}
