import { Injectable } from '@angular/core';
import {usuario} from './usuario';
import {of, Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class usuarioService {
  private endpointUrl = 'http://localhost:8080/api/usuarios';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});
  constructor(private http: HttpClient ) { }

  getusuarios(): Observable<usuario[]>{
    return this.http.get<usuario[]>(this.endpointUrl);
  }

  create(usuario: usuario): Observable<usuario>{
    return this.http.post<usuario>(this.endpointUrl, usuario, {headers: this.httpHeaders});
  }

  getusuario(usuario: usuario): Observable<usuario>{
    let request = this.endpointUrl+ '/usuario' + '?cedula='+ usuario.cedula
                                   + '&nombre=' + usuario.nombre
                                   + '&rol=' + usuario.rol
                                   + '&profesion=' + usuario.profesion
                                   + '&empresaTrabajo=' + usuario.empresaTrabajo
                                   + '&fechaNacimiento=' + usuario.fechaNacimiento
                                   + '&nombreUsuario=' + usuario.nombreUsuario
                                   + '&contrasena=' + usuario.contrasena;
    return this.http.get<usuario>(request);
  }

  login(usuario: usuario): Observable<usuario>{
    let request = this.endpointUrl+ '/login' + '?nombreUsuario=' + usuario.nombreUsuario
                                   + '&contrasena=' + usuario.contrasena;
    return this.http.get<usuario>(request);
  }
  
}
