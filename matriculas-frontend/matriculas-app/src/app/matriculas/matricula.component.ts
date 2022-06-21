import {Component, OnInit} from '@angular/core';
import {matricula} from './matricula';
import {matriculaService} from './matricula.service';

import {usuarioService} from '../usuarios/usuario.service';
import swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { usuario } from '../usuarios/usuario';

@Component({
  selector: 'app-usuarios',
  templateUrl: './matricula.component.html'
})

export class matriculaComponent implements OnInit {



  matriculas: matricula[];
  public matricula: matricula = new matricula;
  public matriculaEditar: matricula = null;
  estados:string[]=["Activo","Inactivo"];
  usuarios:usuario[]=[]

  public title = "Crear Matricula";
  constructor(private matriculaService: matriculaService,
              private usuarioService: usuarioService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(){
    this.matriculaService.getMatriculas().subscribe(
      matriculas => this.matriculas = matriculas
    ); 
    this.usuarioService.getUsuarios().subscribe(
      usuarios => this.usuarios = usuarios
    );
  }

  /* Borrar no está habilitado para la matricula
  delete(programa: programa): void {
    swal.fire({
      title: 'Esta seguro?',
      text: `Quiere eliminar este programa ${programa.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.programaService.delete(programa.id).subscribe(
          response => {
            this.programas = this.programas.filter(cli => cli !== programa)
            swal.fire(
              'Programa Eliminado',
              `Programa ${programa.nombre} eliminado correctamente.`,
              'success'
            )
          }
        )

      }
    })
  }
  */

  /*DUDA
  getUsuario(): void{
    this.activatedRoute.params.subscribe(params => {
      let cedula = params['cedula']
      if(cedula){
        this.programaService.getPrograma(cedula).subscribe( (programa) => this.programa = programa)
      }
    })
  }
  */

  public create(): void{    
    if(this.matriculaEditar!= undefined && this.matriculaEditar.usuario!=null){
        this.update();
    }else{
        this.matriculaService.search(this.matricula)
        .subscribe( matricula => {
          if(matricula!=null){
            this.router.navigate(['/matriculas'])
            swal.fire('Usuario ya registrado', `el usuario que esta intentando ingresar ya existe`, 'error')
            return
          }
        }
        )

        this.matriculaService.create(this.matricula)
        .subscribe(matricula => {
          this.matriculaService.getMatriculas().subscribe(
            matriculas => this.matriculas = matriculas
          );
          this.router.navigate(['/matriculas'])
          swal.fire('Nueva Matricula', `Matricula creada`, 'success')
        }
        );
    }
  }

  update():void{
    this.matriculaService.update(this.matriculaEditar)
    .subscribe( matriculaEditar => {
      this.router.navigate(['/matriculas'])
      swal.fire('matricula actualizada', `usuario ${matriculaEditar.usuario} actualizado`, 'success')
    }
    )
    this.matriculaEditar =null;
  }

  edit(matriculaEditar: matricula):void{
    console.log("entro");
    console.log("matriculaEditar.id"+ matriculaEditar.id);
    console.log("matriculaEditar.usuario" + matriculaEditar.usuario);
    console.log("matriculaEditar.programa"+ matriculaEditar.programa);
    console.log("matriculaEditar.fechaMatricula" + matriculaEditar.fechaMatricula);
    console.log("matriculaEditar.valor" + matriculaEditar.valor);
    console.log("matriculaEditar.estado" + matriculaEditar.estado);
    this.matriculaEditar = matriculaEditar;
  }

}
