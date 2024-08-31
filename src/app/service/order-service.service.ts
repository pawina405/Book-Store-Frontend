import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_ENDPOINT = environment.API_ENDPOINT;
const httpoption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class OrderServiceService {
  constructor(private http: HttpClient) {}

  save(data: any): Observable<any> {
    const body = JSON.stringify(data);
    return this.http.post(API_ENDPOINT.concat('order/save'), body, httpoption);
  }

  saveOrder(data: any): Observable<any> {
    const body = JSON.stringify(data);
    return this.http.post(
      API_ENDPOINT.concat('order/saveOrder'),
      body,
      httpoption
    );
  }

  getAll(): Observable<any> {
    return this.http.get(API_ENDPOINT.concat('order/getAll'));
  }

  getById(id: number): Observable<any> {
    return this.http.get(
      API_ENDPOINT.concat('order/getById?Id=' + id),
      httpoption
    );
  }

  update(id: number, userDto: any): Observable<any> {
    return this.http.put(API_ENDPOINT.concat('order/update'), userDto);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(
      API_ENDPOINT.concat('order/delete/' + id),
      httpoption
    );
  }

  getOrderByUserId(userId: number): Observable<any> {
    return this.http.get<any>(
      API_ENDPOINT.concat('order/getorderByUserId/' + userId)
    );
  }
  getordersByUserId(userId: number): Observable<any> {
    return this.http.get<any>(
      API_ENDPOINT.concat('order/getordersByUserId/' + userId)
    );
  }

  getAllOrders(): Observable<any> {
    return this.http.get<any>(API_ENDPOINT.concat('order/getAllOrders'));
  }
  deleteOrder(id: number): Observable<any> {
    return this.http.delete(
      API_ENDPOINT.concat('order/delete/' + id),
      httpoption
    );
  }
  cancelOrder(orderId: number, userId: number): Observable<any> {
    return this.http.delete(
      `${API_ENDPOINT}order/cancelOrder/${orderId}?userId=${userId}`,
      httpoption
    );
  }
}
