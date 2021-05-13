import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccessRequest } from 'src/app/model/AccessRequest';
import { Layer } from 'src/app/model/Layer';
import { PaginatorDto } from 'src/app/model/PaginatorDto';


const API_BASE: string = "https://corpocaldas.herokuapp.com";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  public getLayers(name: string, accessGranted: number, page: number, size: number): Observable<PaginatorDto> {
    let params: string = this.buildParams(name, accessGranted, page, size);
    return this.http.get<PaginatorDto>(`/api/layers?${params}`);
  }

  private buildParams(name: string, accessGranted: number, page: number, size: number): string {
    let params: string = '';
    if (name !== null && name !== undefined) {
      params += `name=${name}&`;
    }
    if (accessGranted !== null && accessGranted !== undefined) {
      params += `access_granted=${accessGranted}&`;
    }
    if (page !== null && page !== undefined) {
      params += `page=${page}&`;
    }
    if (size !== null && size !== undefined) {
      params += `size=${size}&`;
    }
    return params;
  }
  
  public getLayer(id: number): Observable<Layer> {
    return this.http.get<Layer>(`/api/layers/${id}`);
  }

  public getLayerByName(name: string): Observable<Layer> {
    return this.http.get<Layer>(`/api/layers/name/${name}`);
  }

  public saveAccessRequest(accessRequest: AccessRequest): Observable<AccessRequest> {
    return this.http.post<AccessRequest>('/api/access-request', accessRequest);
  }
}
