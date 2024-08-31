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
export class ProductImgeService {
  constructor(private http: HttpClient) {}

  getAllProductImg(): Observable<any> {
    return this.http.get(API_ENDPOINT.concat('productimg/getAll'));
  }

  getProductImgById(id: number): Observable<any> {
    return this.http.get(
      API_ENDPOINT.concat('productimg/getById/' + id),
      httpoption
    );
  }

  saveProductImg(data: any): Observable<any> {
    const body = JSON.stringify(data);
    return this.http.post(
      API_ENDPOINT.concat('productimg/create'),
      body,
      httpoption
    );
  }

  updateProductImg(id: number, data: any): Observable<any> {
    const body = JSON.stringify(data);
    return this.http.put(
      API_ENDPOINT.concat('productimg/update/' + id),
      body,
      httpoption
    );
  }

  deleteProductImg(id: number): Observable<any> {
    return this.http.delete(
      API_ENDPOINT.concat('productimg/delete/' + id),
      httpoption
    );
  }

  getProductImgByProductId(productId: number): Observable<any> {
    return this.http.get(
      `${API_ENDPOINT}productimg/getByProductId/${productId}`,
      httpoption
    );
  }
}
