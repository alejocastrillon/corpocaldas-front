import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  httpOptions = {
    headers: new HttpHeaders()
      .set('Content-Type', 'application/json;charset=UTF-8')
      .set('Accept', 'application/json')
      .set('Access-Control-Allow-Methods', '*')
      .set('authorization-token', sessionStorage.getItem('ACCESS_TOKEN'))
      .set('authorization-user', sessionStorage.getItem('ACCESS_USER'))
  };

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(`/api/users`, { headers: this.httpOptions.headers });
  }

  saveUser(user): Observable<any> {
    return this.http.post(`/api/users`, user, { headers: this.httpOptions.headers });
  }

  updateUser(userId, user): Observable<any> {
    return this.http.put(`/api/users/${userId}`, user, { headers: this.httpOptions.headers });
  }

}
