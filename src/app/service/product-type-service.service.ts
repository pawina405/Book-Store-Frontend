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
export class ProductTypeServiceService {
  constructor(private http: HttpClient) {}

  getAllProductType(): Observable<any> {
    return this.http.get(API_ENDPOINT.concat('productType/getProductTypeAll'));
  }
}
