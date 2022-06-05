import {Component, OnInit} from '@angular/core';
import {usuario} from './usuario';
import {usuarioService} from './usuario.service';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuario.component.html'
})

export class usuarioComponent implements OnInit {

usuarios: usuario[];

 constructor(private usuarioService: usuarioService){}

 ngOnInit(){
   this.usuarioService.getusuarios().subscribe(
     usuarios => this.usuarios = usuarios
   );
 }
}
