import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Teen } from '../model/teen.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeenService {
 

  private url = `${environment.apiUrl}/v1/adolescente`;
  adolescenteSelected: Teen | undefined= undefined;

  constructor(private http: HttpClient) { }

  findAll(){
    return this.http.get<Teen[]>(`${this.url}/list`);
  }

  create(body: Teen){
    return this.http.post(this.url, body);
  }

  update(adolescente: Teen): Observable<Teen> {
    const updateUrl = `${this.url}/${adolescente.id}`;

    return this.http.put<Teen>(updateUrl, adolescente);
  }

  delete(id: string){
    return this.http.delete(`${this.url}/${id}`);
  }

  activarAdolescente(id: string): Observable<any>{
    const url = `${this.url}/restaurar/${id}`;
    return this.http.put(url, null)
  }
}
