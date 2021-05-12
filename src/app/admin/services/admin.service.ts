import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccessRequest } from 'src/app/model/AccessRequest';
import { Layer } from 'src/app/model/Layer';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  public waitingForApproval(): Observable<Array<AccessRequest>> {
    return this.http.get<Array<AccessRequest>>('api/access-request/waiting-for-approval');
  }

  public updateAccess(access: AccessRequest): Observable<AccessRequest> {
    return this.http.put<AccessRequest>(`/api/access-request/${access.id}`, access);
  }

  public getLayers(): Observable<Array<Layer>> {
    return this.http.get<Array<Layer>>('/api/layers');
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
