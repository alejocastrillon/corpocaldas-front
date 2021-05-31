import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpOptions = {
    headers: new HttpHeaders()
      .set('Content-Type', 'application/json;charset=UTF-8')
      .set('Accept', 'application/json')
      .set('Access-Control-Allow-Methods', '*')
  };

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`/api/users/login?username=${username}?password=${password}`, null, { headers: this.httpOptions.headers });
  }
}
