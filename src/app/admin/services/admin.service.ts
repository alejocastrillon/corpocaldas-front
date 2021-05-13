import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccessRequest } from 'src/app/model/AccessRequest';
import { Layer } from 'src/app/model/Layer';
import { PaginatorDto } from 'src/app/model/PaginatorDto';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  public waitingForApproval(): Observable<Array<AccessRequest>> {
    return this.http.get<Array<AccessRequest>>('api/access-request/waiting-for-approval');
  }

  public filterAccessRequest(name: string, email: string, company: string, layername: string, accessGranted: number, approved: boolean, page: number, size: number): Observable<PaginatorDto> {
    let params: string = this.buildParamsFilter(name, email, company, layername, accessGranted, approved, page, size);
    return this.http.get<PaginatorDto>(`/api/access-request?${params}`);
  }

  private buildParamsFilter(name: string, email: string, company: string, layername: string, accessGranted: number, approved: boolean, page: number, size: number): string {
    let params: string = '';
    if (name !== null && name !== undefined) {
      params += `name=${name}&`;
    }
    if (email !== null && email !== undefined) {
      params += `email=${email}&`;
    }
    if (company !== null && company !== undefined) {
      params += `company=${company}&`;
    }
    if (layername !== null && layername !== undefined) {
      params += `layername=${layername}&`;
    }
    if (accessGranted !== null && accessGranted !== undefined) {
      params += `access_granted=${accessGranted}&`;
    }
    if (approved !== null && approved !== undefined) {
      params += `approved=${approved}&`;
    }
    if (page !== null && page !== undefined) {
      params += `page=${page}&`;
    }
    if (size !== null && size !== undefined) {
      params += `size=${size}&`;
    }
    return params;
  }

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

  public updateAccess(access: AccessRequest): Observable<AccessRequest> {
    return this.http.put<AccessRequest>(`/api/access-request/${access.id}`, access);
  }

  public editLayer(layer: Layer): Observable<Layer> {
    return this.http.put<Layer>('/api/layers/' + layer.id, layer);
  }

  public saveLayer(layer: Layer): Observable<Layer> {
    return this.http.post<Layer>('/api/layers', layer);
  }

  public deleteLayer(idLayer: number): Observable<boolean> {
    return this.http.delete<boolean>('/api/layers/' + idLayer);
  }

}
