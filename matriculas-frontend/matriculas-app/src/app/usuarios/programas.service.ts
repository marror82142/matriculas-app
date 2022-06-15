import { Injectable } from '@angular/core';
import {programas} from './programas';
import {of, Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class programasService {
  private endpointUrl = 'http://localhost:8080/api/programas';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});
  constructor(private http: HttpClient ) { }

  getusuarios(): Observable<programas[]>{
    return this.http.get<programas[]>(this.endpointUrl);
  }

  create(programas: programas): Observable<programas>{
    return this.http.post<programas>(this.endpointUrl, programas, {headers: this.httpHeaders});
  }

  getProgramas(programas: programas): Observable<programas>{
    let request = this.endpointUrl+ '/programas' + '?nombre='+ programas.nombre;
    return this.http.get<programas>(request);
  }

  getListaProgramas(): Observable<programas[]>{
    return this.http.get<programas[]>(this.endpointUrl);
  }
  
}
