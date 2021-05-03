import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
  })
};

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  // httpOptions = {
  //   headers: new HttpHeaders()
  //     .set('Content-Type', 'application/json;charset=UTF-8')
  //     .set('Accept', 'application/json')
  //     .set('Access-Control-Allow-Origin', '*')
  //   // .set('Authorization', 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')) // aqui coloca el token que guardo en el local
  // };


  requestMapping = '/access-request'

  constructor(private http: HttpClient) { }

  waitingForApproval() {
    return this.http.get(environment.gateway + this.requestMapping + '/waiting-for-approval', {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json'
      },
    });
  }

  validateAcess(data: any) {
    return this.http.post(environment.gateway + this.requestMapping + '/validate-access', data);
  }
}
