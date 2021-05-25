import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccessRequest } from 'src/app/model/AccessRequest';
import { Layer } from 'src/app/model/Layer';
import { PaginatorDto } from 'src/app/model/PaginatorDto';
import { WorkSpaceDto } from 'src/app/model/WorkSpaceDto';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  public waitingForApproval(): Observable<Array<AccessRequest>> {
    return this.http.get<Array<AccessRequest>>('api/access-request/waiting-for-approval');
  }

  public filterAccessRequest(name: string, email: string, company: string, layername: string, accessGranted: number, approved: boolean, page: number, size: number): Observable<PaginatorDto> {
    let params: string = this.buildAccessRequestParamsFilter(name, email, company, layername, accessGranted, approved, page, size);
    return this.http.get<PaginatorDto>(`/api/access-request?${params}`);
  }

  private buildAccessRequestParamsFilter(name: string, email: string, company: string, layername: string, accessGranted: number, approved: boolean, page: number, size: number): string {
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

  public getWorkspaces(name: string, page: number, size: number) : Observable<PaginatorDto> {
    let params: string = this.buildWorkspaceParamsFilter(name, page, size);
    return this.http.get<PaginatorDto>(`/api/workspaces?${params}`);
  }

  private buildWorkspaceParamsFilter(name: string, page: number, size: number): string {
    let params: string = '';
    if (name !== null && name !== undefined) {
      params += `name=${name}&`;
    }
    if (page !== null && page !== undefined) {
      params += `page=${page}&`;
    }
    if (size !== null && size !== undefined) {
      params += `size=${size}&`;
    }
    return params;
  }

  public getLayers(name: string, accessGranted: number, visible: boolean, page: number, size: number): Observable<PaginatorDto> {
    let params: string = this.buildLayerParamsFilter(name, accessGranted, visible, page, size);
    return this.http.get<PaginatorDto>(`/api/layers?${params}`);
  }

  private buildLayerParamsFilter(name: string, accessGranted: number, visible: boolean, page: number, size: number): string {
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
    if (visible !== null && visible !== undefined) {
      params += `visible=${visible}&`;
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

  public saveWorkspace(workspace: WorkSpaceDto): Observable<WorkSpaceDto> {
    return this.http.post<WorkSpaceDto>('/api/workspaces', workspace);
  }

  public deleteLayer(idLayer: number): Observable<boolean> {
    return this.http.delete<boolean>('/api/layers/' + idLayer);
  }

}
