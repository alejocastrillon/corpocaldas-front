import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccessRequest } from 'src/app/model/AccessRequest';
import { Layer } from 'src/app/model/Layer';
import { PaginatorDto } from 'src/app/model/PaginatorDto';
import { WorkSpaceDto } from 'src/app/model/WorkSpaceDto';
import { TreeNode } from 'primeng/api';
import { SaveWorkspace } from 'src/app/model/SaveWorkspace';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  public waitingForApproval(): Observable<Array<AccessRequest>> {
    return this.http.get<Array<AccessRequest>>('api/access-request/waiting-for-approval');
  }

  public filterAccessRequest(name: string, email: string, company: string, layername: string, accessGranted: number, page: number, size: number): Observable<PaginatorDto> {
    let params: string = this.buildAccessRequestParamsFilter(name, email, company, layername, accessGranted, page, size);
    return this.http.get<PaginatorDto>(`/api/access-request?${params}`);
  }

  private buildAccessRequestParamsFilter(name: string, email: string, company: string, layername: string, accessGranted: number, page: number, size: number): string {
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
    let formData: FormData = new FormData();
    formData.append('id', layer.id.toString());
    formData.append('name', layer.name);
    formData.append('reference_name', layer.referenceName);
    formData.append('id_workspace', layer.idWorkspace.toString());
    formData.append('access_granted', layer.accessGranted.toString());
    formData.append('visible', String(layer.visible));
    formData.append('metadata', layer.file);
    return this.http.put<Layer>(`/api/layers/${layer.id}`, formData);
  }

  public saveLayer(layer: Layer): Observable<Layer> {
    let formData: FormData = new FormData();
    formData.append('name', layer.name);
    formData.append('reference_name', layer.referenceName);
    formData.append('id_workspace', layer.idWorkspace.toString());
    formData.append('access_granted', layer.accessGranted.toString());
    formData.append('visible', String(layer.visible));
    formData.append('metadata', layer.file);
    return this.http.post<Layer>('/api/layers', formData);
  }

  public saveWorkspace(workspace: SaveWorkspace): Observable<WorkSpaceDto> {
    return this.http.post<WorkSpaceDto>('/api/workspaces', workspace);
  }

  public getWorkspace(workspaceId: number): Observable<WorkSpaceDto> {
    return this.http.get<WorkSpaceDto>(`/api/workspaces/${workspaceId}`);
  }

  public deleteLayer(idLayer: number): Observable<boolean> {
    return this.http.delete<boolean>('/api/layers/' + idLayer);
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

  public buildUserParamsFilter(name: string, lastname: string, email: string, isEnabled: boolean, page: number, size: number): string {
    let params: string = '';
    if (name !== null && name !== undefined) {
      params += `name=${name}&`;
    }
    if (lastname !== null && lastname !== undefined) {
      params += `lastname=${lastname}&`;
    }
    if (email !== null && email !== undefined) {
      params += `email=${email}&`;
    }
    if (isEnabled !== null && isEnabled !== undefined) {
      params += `is_enabled=${isEnabled}&`;
    }
    if (page !== null && page !== undefined) {
      params += `page=${page}&`;
    }
    if (size !== null && size !== undefined) {
      params += `size=${size}&`;
    }
    return params;
  }

  public getUsers(name: string, lastname: string, email: string, isEnabled: boolean, page: number, size: number): Observable<PaginatorDto> {
    const params: string = this.buildUserParamsFilter(name, lastname, email, isEnabled, page, size);
    return this.http.get<PaginatorDto>(`/api/users?${params}`);
  }

  public logout(): Observable<any> {
    return this.http.get('/api/users/logout');
  }

  public saveUser(user): Observable<any> {
    return this.http.post(`/api/users`, user);
  }

  public updateUser(userId, user): Observable<any> {
    return this.http.put(`/api/users/${userId}`, user);
  }

}
