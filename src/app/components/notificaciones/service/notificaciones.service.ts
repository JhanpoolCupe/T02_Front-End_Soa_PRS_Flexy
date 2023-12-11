import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Funcionario } from '../model/funcionary.model';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  

  private apiUrl = 'http://localhost:8082/api/notification';
  private apiUrlentidad = 'http://localhost:8081/v1/funcionary';

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    const url = `${this.apiUrl}`;
    return this.http.get(url);
  }
  obtenerDatos(): Observable<any> {
    return this.http.get(this.apiUrlentidad);
  }

  createNotification(notificationData: any) {
    return this.http.post(this.apiUrl, notificationData);
  }

  findAll() {
    return this.http.get<Funcionario[]>(this.apiUrlentidad);
  }

  
}
