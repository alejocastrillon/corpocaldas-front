import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccessRequest } from 'src/app/model/AccessRequest';
import { Layer } from 'src/app/model/Layer';
import { PaginatorDto } from 'src/app/model/PaginatorDto';
import { WorkSpaceDto } from 'src/app/model/WorkSpaceDto';
import { TreeNode } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  httpOptions = {
    headers: new HttpHeaders()
      .set('Content-Type', 'application/json;charset=UTF-8')
      .set('Accept', 'application/json')
      .set('Access-Control-Allow-Methods', '*')
      .set('authorization-token', sessionStorage.getItem('ACCESS_TOKEN'))
      .set('authorization-user', sessionStorage.getItem('ACCESS_USER'))
  };

  constructor(private http: HttpClient) { }

  public waitingForApproval(): Observable<Array<AccessRequest>> {
    return this.http.get<Array<AccessRequest>>('api/access-request/waiting-for-approval', { headers: this.httpOptions.headers });
  }

  public filterAccessRequest(name: string, email: string, company: string, layername: string, accessGranted: number, approved: boolean, page: number, size: number): Observable<PaginatorDto> {
    let params: string = this.buildAccessRequestParamsFilter(name, email, company, layername, accessGranted, approved, page, size);
    return this.http.get<PaginatorDto>(`/api/access-request?${params}`, { headers: this.httpOptions.headers });
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
    return this.http.get<PaginatorDto>(`/api/workspaces?${params}`, { headers: this.httpOptions.headers });
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
    return this.http.get<PaginatorDto>(`/api/layers?${params}`, { headers: this.httpOptions.headers });
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
    return this.http.put<AccessRequest>(`/api/access-request/${access.id}`, access, { headers: this.httpOptions.headers });
  }

  public editLayer(layer: Layer): Observable<Layer> {
    return this.http.put<Layer>('/api/layers/' + layer.id, layer, { headers: this.httpOptions.headers });
  }

  public saveLayer(layer: Layer): Observable<Layer> {
    return this.http.post<Layer>('/api/layers', layer, { headers: this.httpOptions.headers });
  }

  public saveWorkspace(workspace: WorkSpaceDto): Observable<WorkSpaceDto> {
    return this.http.post<WorkSpaceDto>('/api/workspaces', workspace, { headers: this.httpOptions.headers });
  }

  public getWorkspace(workspaceId: number): Observable<WorkSpaceDto> {
    return this.http.get<WorkSpaceDto>(`/api/workspaces/${workspaceId}`, { headers: this.httpOptions.headers });
  }

  public deleteLayer(idLayer: number): Observable<boolean> {
    return this.http.delete<boolean>('/api/layers/' + idLayer, { headers: this.httpOptions.headers });
  }

  public buildTree(workspaces: Array<WorkSpaceDto>): TreeNode[] {
    return Object.keys(workspaces).reduce<TreeNode[]>((accumulator, key) => {
      let value = workspaces[key];
      let node: TreeNode = {};
      node.label = value.name;
      node.data = value;
      node.leaf = !value.hasChildren;
      if (value != null) {
        if (typeof value["childrens"] === "object" && value["childrens"].length > 0) {
          node.children = this.buildTree(value["childrens"]);
        } else {
          node.children = [];
        }
      }
      return accumulator.concat(node);
    }, []);
  }

}
