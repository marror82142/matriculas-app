import { Router } from '@angular/router'
import {Component, OnInit} from '@angular/core';
import {programas} from './programas';
import {programasService} from './programas.service';


@Component({
  selector: 'app-form',
  templateUrl: './programas.component.html'
})
export class programasComponent implements OnInit {
  tipos:string[]=["Posgrado","Pregrado","Tecnologia", "Tecnica"];
  listaProgramas: programas[];

  public programas: programas = new programas;
  public title = "Crear usuario";
  constructor(private programasService: programasService,
              private router: Router) { }

  ngOnInit(): void {
    this.programasService.getListaProgramas().subscribe(
      listaProgramas => this.listaProgramas = listaProgramas
    );
  }

public getProgramas(): void{
  if(this.programas.nombre == null || 
    this.programas.codigo == null
  ){
    alert("Los campos son requeridos");
  }else{
    this.programasService.create(this.programas).subscribe(
      response => this.router.navigate(['/programas'])
    )
  }
}

}