import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {

  private apiUrll = 'http://localhost:8084'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) {}

  getActividades() {
    return this.http.get(this.apiUrll+ '/ms-soa/listData');
  }
}
