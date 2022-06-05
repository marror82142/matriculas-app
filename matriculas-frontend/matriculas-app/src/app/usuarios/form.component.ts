import { Component, OnInit } from '@angular/core';
import { usuario } from './usuario';
import { usuarioService } from './usuario.service'
import { Router } from '@angular/router'
import * as moment from 'moment';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  public usuario: usuario = new usuario;
  public title = "Crear usuario";
  constructor(private usuarioService: usuarioService,
              private router: Router) { }

  ngOnInit(): void {
  }

public getusuario(): void{
  if(this.usuario.cedula == null
    || this.usuario.nombre == null
    || this.usuario.rol == null
    || this.usuario.profesion == null
    || this.usuario.empresaTrabajo == null
    || this.usuario.nombreUsuario == null
    || this.usuario.contrasena == null
    || this.usuario.fechaNacimiento == null
  ){
    alert("Los campos son requeridos");
  }else{
    if(!moment(this.usuario.fechaNacimiento, 'YYYY-MM-DD',true).isValid()){
      alert("Formato de fecha incorrecto.");
    }else{
      this.usuarioService.getusuario(this.usuario).subscribe(
        response => this.router.navigate(['/usuarios'])
      )
    }
  }
}

}
