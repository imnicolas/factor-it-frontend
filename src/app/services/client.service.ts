import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = 'http://localhost:8080/api/clientes';

  constructor(private http: HttpClient) { }

  getVipClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}/vip`);
  }

  getNewVipClients(anio: number, mes: number): Observable<Client[]> {
    let params = new HttpParams().set('anio', anio.toString()).set('mes', mes.toString());
    return this.http.get<Client[]>(`${this.apiUrl}/vip/nuevos`, { params });
  }

  getLostVipClients(anio: number, mes: number): Observable<Client[]> {
    let params = new HttpParams().set('anio', anio.toString()).set('mes', mes.toString());
    return this.http.get<Client[]>(`${this.apiUrl}/vip/perdieron`, { params });
  }
}
