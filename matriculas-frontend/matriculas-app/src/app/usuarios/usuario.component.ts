import {Component, OnInit} from '@angular/core';
import {usuario} from './usuario';
import {usuarioService} from './usuario.service';
import swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { contacto } from './contacto';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuario.component.html'
})

export class usuarioComponent implements OnInit {

  usuarios: usuario[];
  public infoContacto: contacto = new contacto();
  public usuario: usuario = new usuario;
  public usuarioEditar: usuario = null;

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
    if(this.usuarioEditar!=null){
      if(!moment(this.usuarioEditar.fechaNacimiento, 'YYYY-MM-DD',true).isValid()){
        swal.fire("Formato de fecha incorrecto.");
      }else{
        this.update();
      }
    }else{
      if(!moment(this.usuario.fechaNacimiento, 'YYYY-MM-DD',true).isValid()){
        swal.fire("Formato de fecha incorrecto.");
      }else{
        this.usuario.infoContacto = this.infoContacto
        this.usuarioService.create(this.usuario)
        .subscribe(usuario => {
          this.usuarioService.getUsuarios().subscribe(
            usuarios => this.usuarios = usuarios
          );
          this.router.navigate(['/usuarios'])
          swal.fire('Nuevo usuario', `usuario ${usuario.nombreUsuario} creado`, 'success')
        }
        );
      }
    }
  }

  update():void{
    this.usuarioService.update(this.usuarioEditar)
    .subscribe( usuarioEditar => {
      this.router.navigate(['/usuarios'])
      swal.fire('Usuario actualizado', `usuario ${usuarioEditar.nombreUsuario} actualizado`, 'success')
    }
    )
  }

  edit(usuarioEditar: usuario):void{
    this.usuarioEditar = usuarioEditar;
  }

  createPdf(){
    console.log('entro al metodo');
    let arra =  [];
    this.usuarios.forEach(function (value) {
      console.log(value.cedula);
      console.log(value.contrasena);
      console.log(value.empresaTrabajo);
      console.log(value.fechaNacimiento);
      console.log(value.nombre);
      console.log(value.nombreUsuario);
      console.log(value.profesion);
      console.log(value.rol);
      console.log('info contacto'+value.infoContacto.id);
      arra = [value.cedula, value.contrasena, value.empresaTrabajo,value.fechaNacimiento,value.nombre,value.nombreUsuario,value.profesion,value.rol,value.infoContacto.id];
    });

    const pdfDefinition: any = {
      content:[{text: 'Reporte de usuarios', style: 'subheader'},
      'La siguiente tabla contiene informacion de los usuarios',
      {
        style: 'tableExample',
        table: {
          body: [
            ['Cedula', 'Contraseña', 'Empresa', 'Fecha_nacimiento','nombre', 'nombre de usuario','profesion','rol','contacto'],
            arra
          ]
        }
      }]
    }
    console.log(pdfDefinition);
    const pdf = pdfMake.createPdf(pdfDefinition);
    console.log(pdf);
    pdf.open();
    
  }

}
