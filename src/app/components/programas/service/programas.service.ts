import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProgramasService {

  private apiUr = 'http://localhost:8085'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) {}

  getProgramas(){
    return this.http.get(this.apiUr +'/v1/programs/list');
  }
}
