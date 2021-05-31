import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(`/api/users`);
  }

  saveUser(user): Observable<any> {
    return this.http.post(`/api/users`, user);
  }

  updateUser(userId, user): Observable<any> {
    return this.http.put(`/api/users/${userId}`, user);
  }


}
