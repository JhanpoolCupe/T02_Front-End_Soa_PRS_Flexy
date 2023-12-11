import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Entidades } from '../model/entidades.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntidadesService {
  private url = `${environment.apiUrl}/v1/entidad`;
  entidadSelected: Entidades | undefined= undefined;

  constructor(private http: HttpClient) {}

  findAll() {
    return this.http.get<Entidades[]>(this.url);
  }

  create(body: Entidades) {
    return this.http.post(this.url, body);
  }
  update(entidad: Entidades): Observable<Entidades> {
    const updateUrl = `${this.url}/${entidad.id}`; // Asegúrate de que entidad.id sea el identificador correcto

    return this.http.put<Entidades>(updateUrl, entidad);
  }
  delete(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }
  activarEntidad(id: string): Observable<any> {
    const url = `${this.url}/${id}/activar`;
    return this.http.put(url, null);
  }

  generarPDF(): Observable<ArrayBuffer> {
    const url1 = `${this.url}/export-pdf`;
    return this.http.get(url1, { responseType: 'arraybuffer' });
  }

}
