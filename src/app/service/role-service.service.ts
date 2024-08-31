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
export class RoleserviceService {
  constructor(private http: HttpClient) {}

  getAllRole(): Observable<any> {
    return this.http.get(API_ENDPOINT.concat('role/getAll'));
  }

  getRoleById(id: number): Observable<any> {
    return this.http.get(API_ENDPOINT.concat('role/getById/' + id), httpoption);
  }

  saveRole(data: any): Observable<any> {
    const body = JSON.stringify(data);
    return this.http.post(API_ENDPOINT.concat('role/save'), body, httpoption);
  }

  updateRole(id: number, data: any): Observable<any> {
    const body = JSON.stringify(data);
    return this.http.put(
      API_ENDPOINT.concat('role/update/' + id),
      body,
      httpoption
    );
  }

  deleteRole(id: number): Observable<any> {
    return this.http.delete(
      API_ENDPOINT.concat('role/delete/' + id),
      httpoption
    );
  }
}
