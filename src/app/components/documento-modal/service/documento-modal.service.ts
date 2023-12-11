import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentoModalService {

  private apiUrl = 'http://localhost:8081/api/data';

  constructor(private http: HttpClient) { }

  getData(dni : string): Observable<any> {
    const url = `${this.apiUrl}?dni=${dni}`;
    return this.http.get(url);
  }
}
