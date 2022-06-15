import {Component, OnInit} from '@angular/core';
import {usuario} from './usuario';
import {usuarioService} from './usuario.service';
import swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuario.component.html'
})

export class usuarioComponent implements OnInit {

  usuarios: usuario[];
  public usuario: usuario = new usuario;
  public title = "Crear usuario";
  constructor(private usuarioService: usuarioService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(){
    this.usuarioService.getUsuarios().subscribe(
      usuarios => this.usuarios = usuarios
    );
  }

  delete(usuario: usuario): void {
    swal.fire({
      title: 'Esta seguro?',
      text: `Quiere eliminar este usuario ${usuario.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.usuarioService.delete(usuario.cedula).subscribe(
          response => {
            this.usuarios = this.usuarios.filter(cli => cli !== usuario)
            swal.fire(
              'Usuario Eliminado',
              `Usuario ${usuario.nombre} eliminado correctamente.`,
              'success'
            )
          }
        )

      }
    })
  }

  getUsuario(): void{
    this.activatedRoute.params.subscribe(params => {
      let cedula = params['cedula']
      if(cedula){
        this.usuarioService.getUsuario(cedula).subscribe( (usuario) => this.usuario = usuario)
      }
    })
  }

  public create(): void{
    if(this.usuario.cedula == null
      || this.usuario.nombre == null
      || this.usuario.rol == null
      || this.usuario.profesion == null
      || this.usuario.empresaTrabajo == null
      || this.usuario.nombreUsuario == null
      || this.usuario.contrasena == null
      || this.usuario.fechaNacimiento == null
    ){
      swal.fire("Los campos son requeridos");
    }else{
      if(!moment(this.usuario.fechaNacimiento, 'YYYY-MM-DD',true).isValid()){
        swal.fire("Formato de fecha incorrecto.");
      }else{
        this.usuarioService.create(this.usuario)
        .subscribe(usuario => {
          this.usuarioService.getUsuarios().subscribe(
            usuarios => this.usuarios = usuarios
          );
          this.router.navigate(['/usuarios'])
          swal.fire('Nuevo usuario', `usuario ${usuario.nombre} creado`, 'success')
        }
        );
      }
    }
  }

  update():void{
    this.usuarioService.update(this.usuario)
    .subscribe( usuario => {
      this.router.navigate(['/usuarios'])
      swal.fire('Usuario actualizado', `usuario ${usuario.nombre} actualizado`, 'success')
    }
    )
  }

  edit(usuarioEditar: usuario):void{
    this.usuario = usuarioEditar;
  }

}
