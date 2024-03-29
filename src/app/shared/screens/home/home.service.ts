import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { bindNodeCallback, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AccessRequest } from 'src/app/model/AccessRequest';
import { Layer } from 'src/app/model/Layer';
import { PaginatorDto } from 'src/app/model/PaginatorDto';
import { WorkSpaceDto } from 'src/app/model/WorkSpaceDto';


const API_BASE: string = "https://corpocaldas.herokuapp.com";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  public getLayers(name: string, accessGranted: number, visible: boolean, page: number, size: number): Observable<PaginatorDto> {
    let params: string = this.buildParams(name, accessGranted, visible, page, size);
    return this.http.get<PaginatorDto>(`/api/layers?${params}`);
  }

  private buildParams(name: string, accessGranted: number, visible: boolean, page: number, size: number): string {
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
  
  public getLayer(id: number): Observable<Layer> {
    return this.http.get<Layer>(`/api/layers/${id}`);
  }

  public getLayerByName(name: string): Observable<Layer> {
    return this.http.get<Layer>(`/api/layers/name/${name}`);
  }

  public saveAccessRequest(accessRequest: AccessRequest): Observable<AccessRequest> {
    return this.http.post<AccessRequest>('/api/access-request', accessRequest);
  }

  public getWorkspace(workspaceId: number): Observable<WorkSpaceDto> {
    return this.http.get<WorkSpaceDto>(`/api/workspaces/${workspaceId}`);
  }

  public buildTree(workspaces: Array<WorkSpaceDto>): TreeNode[] {
    return Object.keys(workspaces).reduce<TreeNode[]>((accumulator, key) => {
      let value = workspaces[key];
      let node: TreeNode = {};
      node.label = value.name;
      node.data = value;
      node.data.object = "workspace";
      node.leaf = !value.hasChildren;
      node.data.icon = 'pi pi-fw pi-images';
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

  public verifyAccess(token: string, email: string, layerId: number): Observable<AccessRequest> {
    const form = new FormData();
    form.append('accessToken', token);
    form.append('email', email);
    form.append('layerId', layerId.toString());
    return this.http.post<AccessRequest>('/api/access-request/validate-access', form);
  }

  public getXmlData(fileName: string): Observable<any> {
    return this.http.get(`/api/files/${fileName}`);
  }
  
}
