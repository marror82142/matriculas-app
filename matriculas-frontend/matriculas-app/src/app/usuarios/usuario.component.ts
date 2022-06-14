import {Component, OnInit} from '@angular/core';
import {usuario} from './usuario';
import {usuarioService} from './usuario.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuario.component.html'
})

export class usuarioComponent implements OnInit {

usuarios: usuario[];

 constructor(private usuarioService: usuarioService){}

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
}
