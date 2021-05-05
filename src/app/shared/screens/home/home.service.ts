import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccessRequest } from 'src/app/model/AccessRequest';
import { Layer } from 'src/app/model/Layer';


const API_BASE: string = "https://corpocaldas.herokuapp.com";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  public getLayers(): Observable<Array<Layer>> {
    return this.http.get<Array<Layer>>("/api/layers");
  }

  public saveAccessRequest(accessRequest: AccessRequest): Observable<AccessRequest> {
    return this.http.post<AccessRequest>('/api/access-request', accessRequest);
  }
}
