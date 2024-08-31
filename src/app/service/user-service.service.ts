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
export class UserServiceService {
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any> {
    return this.http.get(API_ENDPOINT.concat('user/getAll'));
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(
      API_ENDPOINT.concat('user/getById?Id=' + id),
      httpoption
    );
  }

  saveUser(data: any): Observable<any> {
    const body = JSON.stringify(data);
    return this.http.post(API_ENDPOINT.concat('user/save'), body, httpoption);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(
      API_ENDPOINT.concat('user/delete?Id=' + id),
      httpoption
    );
  }

  updateUser(userDto: any): Observable<any> {
    const body = JSON.stringify(userDto);
    return this.http.put(API_ENDPOINT.concat('user/update'), body, httpoption);
  }

  login(userName: any, password: any): Observable<any> {
    return this.http.get(
      API_ENDPOINT.concat(
        'user/login?userName=' + userName + '&password=' + password
      )
    );
  }

  register(data: any): Observable<any> {
    const body = JSON.stringify(data);
    return this.http.post(
      API_ENDPOINT.concat('user/register'),
      body,
      httpoption
    );
  }
}
