import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';

const API_ENDPOINT = environment.API_ENDPOINT;
const httpoption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class ProductServiceService {
  constructor(private http: HttpClient) {}

  getProductById(id: number): Observable<any> {
    return this.http.get(
      API_ENDPOINT.concat('product2/getById?Id=' + id),
      httpoption
    );
  }

  getAllProduct(): Observable<any> {
    return this.http.get(API_ENDPOINT.concat('product2/getAll'));
  }
  saveProduct(data: any): Observable<any> {
    const body = JSON.stringify(data);
    return this.http.post(
      API_ENDPOINT.concat('product2/save'),
      body,
      httpoption
    );
  }

  updateProduct(data: any, productId: any): Observable<any> {
    const body = JSON.stringify(data);
    return this.http.put<any>(
      API_ENDPOINT.concat('product2/update/' + productId),
      body,
      httpoption
    );
  }

  deleteProduct(id: any): Observable<any> {
    return this.http.delete(API_ENDPOINT.concat('product2/delete?Id=' + id));
  }

  addImgByProductImgId(productImgId: any, file: FormData) {
    return this.http.post(
      API_ENDPOINT.concat('product2/addProductImg/' + productImgId),
      file
    );
  }
}
