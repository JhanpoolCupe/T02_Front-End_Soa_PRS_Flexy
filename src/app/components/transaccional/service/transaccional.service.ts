import { Injectable } from '@angular/core';
import { Transactional } from '../model/transacional.modal';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class TransaccionalService {

  urlactividad= "http://localhost:8084/ms-soa/listData";
  url2 = "http://localhost:8086";

  private url = `${this.url2}/api/asignation/programs`;
  asignationSelected: Transactional | undefined = undefined;

  constructor(private http: HttpClient) {}
  
  listaactividaes(): Observable<any>{
    return this.http.get(this.urlactividad);
  }
  
  listarPorEstado(activo: string): Observable<Transactional[]> {
    const url = `${this.url2}/api/asignation/programs/${activo}`;
    return this.http.get<Transactional[]>(url);
  }

  registrar(datos: any): Observable<any> {
    return this.http.post(`${this.url2}/api/asignation/programs`, datos).pipe(
      catchError((error) => {
        console.error("Error al registrar:", error);
        return throwError(error); 
      })
    );
  }

  actualizarRegistro(id: string , nuevoRegistro: Transactional): Observable<Transactional> {
    const url = `${this.url2}/api/asignation/programs/${id}`;
    return this.http.put<Transactional>(url, nuevoRegistro);
  }

  activarT(id: string): Observable<any>{
    const url = `${this.url2}/${id}/activar`;
    return this.http.put(url, null);
  }
}
