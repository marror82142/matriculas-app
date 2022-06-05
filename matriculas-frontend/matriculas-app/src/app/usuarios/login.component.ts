import { Component, OnInit } from '@angular/core';
import { usuario } from './usuario';
import { usuarioService } from './usuario.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-form',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  public usuario: usuario = new usuario;
  public title = "Iniciar Sesion";
  constructor(private usuarioService: usuarioService,
              private router: Router) { }

  ngOnInit(): void {
  }

public login(): void{
  if(this.usuario.contrasena == null
    || this.usuario.nombreUsuario == null
  ){
    alert("Los campos son requeridos");
  }else{
      this.usuarioService.login(this.usuario).subscribe(
        response => { 
                      if(response.rol == "Estudiante"){
                        this.router.navigate([''])
                      }else{
                        this.router.navigate(['/usuarios'])
                      }
                    },
        error => alert("Nombre de usuario o contrasena incorrectos")
      )    
  }
}

}
