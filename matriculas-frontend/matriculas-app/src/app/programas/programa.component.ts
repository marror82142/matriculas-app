import {Component, OnInit} from '@angular/core';
import {programa} from './programa';
import {programaService} from './programa.service';
import swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-usuarios',
  templateUrl: './programa.component.html'
})

export class programaComponent implements OnInit {

  programas: programa[];
  public programa: programa = new programa;
  public programaEditar: programa = null;
  tipos:string[]=["Posgrado","Pregrado","Tecnologia", "Tecnica"];
  public title = "Crear programa";
  constructor(private programaService: programaService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(){
    this.programaService.getProgramas().subscribe(
      programas => this.programas = programas
    );
  }

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
  

  getUsuario(): void{
    this.activatedRoute.params.subscribe(params => {
      let cedula = params['cedula']
      if(cedula){
        this.programaService.getPrograma(cedula).subscribe( (programa) => this.programa = programa)
      }
    })
  }

  public create(): void{    
    if(this.programaEditar!= undefined && this.programaEditar.codigo!=null){
        this.update();
    }else{
        this.programaService.search(this.programa)
        .subscribe( programa => {
          if(programa!=null){
            this.router.navigate(['/programas'])
            swal.fire('Codigo duplicado', `el codigo que esta intentando ingresar ya existe`, 'error')
            return
          }
        }
        )

        this.programaService.create(this.programa)
        .subscribe(programa => {
          this.programaService.getProgramas().subscribe(
            programas => this.programas = programas
          );
          this.router.navigate(['/programas'])
          swal.fire('Nuevo programa creado', `programa creado`, 'success')
        }
        );
    }
  }

  update():void{
    this.programaService.update(this.programaEditar)
    .subscribe( programaEditar => {
      this.router.navigate(['/programas'])
      swal.fire('programa actualizado', `usuario ${programaEditar.nombre} actualizado`, 'success')
    }
    )
    this.programaEditar =null;
  }

  edit(programaEditar: programa):void{
    console.log("entro");
    console.log("programaEditar.nombre"+ programaEditar.nombre);
    console.log("programaEditar.id" + programaEditar.id);
    console.log("programaEditar.codigo"+ programaEditar.codigo);
    console.log("programaEditar.tipo" + programaEditar.tipo);
    this.programaEditar = programaEditar;
  }

}
