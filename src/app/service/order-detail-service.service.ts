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
export class OrderDetailServiceService {
  constructor(private http: HttpClient) {}

  getAllOrderDetail() {
    return this.http.get(API_ENDPOINT.concat('orderdetail'));
  }
  getOrderDetailById(id: number) {
    return this.http.get(API_ENDPOINT.concat('orderdetail/' + id));
  }
  saveOrderDetail(data: any): Observable<any> {
    const body = JSON.stringify(data);
    return this.http.post(
      API_ENDPOINT.concat('orderdetail/save'),
      body,
      httpoption
    );
  }
  updateOrderDetail(id: number, data: any) {
    const body = JSON.stringify(data);
    console.log('Request Body:', body);
    return this.http.put(
      API_ENDPOINT.concat('orderdetail/update/' + id),
      body,
      httpoption
    );
  }
  deleteOrderDetail(id: number) {
    return this.http.delete(
      API_ENDPOINT.concat('orderdetail/delete/' + id),
      httpoption
    );
  }
}
