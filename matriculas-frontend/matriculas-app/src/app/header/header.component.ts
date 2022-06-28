import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { usuario } from '../usuarios/usuario';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent {
title = 'Matriculas App'
public usuarioActual=JSON.parse(localStorage.getItem("usuarioActual"));
  constructor(private router: Router){}
  public cerrarSesion(): void{
    if(this.usuarioActual){
      localStorage.clear()
      localStorage.setItem('usuarioActual', JSON.stringify(null));
      this.router.navigate([''])
    }
  }
}
