import {Component, OnInit} from '@angular/core';

import {matricula} from './matricula';
import {matriculaService} from './matricula.service';
import {usuarioService} from '../usuarios/usuario.service';
import {programaService} from '../programas/programa.service';

import swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { usuario } from '../usuarios/usuario';
import { programa } from '../programas/programa';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
  programas:programa[]=[]
  

  selectUser:any;
  selectProg:any;
  usuario:String;
  programa:String;

  public title = "Crear Matricula";
  constructor(private matriculaService: matriculaService,
              private usuarioService: usuarioService,
              private programaService: programaService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(){
    this.matriculaService.getMatriculas().subscribe(
      matriculas => this.matriculas = matriculas
    ); 

    this.usuarioService.getUsuarios().subscribe(
      usuarios => this.usuarios = usuarios
    );
    
    this.programaService.getProgramas().subscribe(
      programas => this.programas = programas
    );
  }

  public create(): void{    
    if(this.matriculaEditar!= undefined && this.matriculaEditar.usuario!=null){
        this.update();
    }else{

        this.matriculas.find(m => {
          if(m.usuario.cedula == this.selectUser.cedula && m.programa.codigo == this.selectProg.codigo){
            swal.fire('Error', `Matricula ya existente`, 'error')
          }else{
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
        });

        
    }
  }

  update():void{
    this.matriculaService.update(this.matriculaEditar)
    .subscribe( matriculaEditar => {
      this.router.navigate(['/matriculas'])
      swal.fire('matricula actualizada', `usuario ${matriculaEditar.usuario.nombre} actualizado`, 'success')
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

  selectPrograma(event: Event): void{
    const target = event.target as HTMLInputElement;  
    console.log("selecciona : " + target.value +" "+ typeof(target.value));

    this.programas.find(p =>{
      if(p.codigo == this.selectProg.codigo){
        this.matricula.programa = p;
      }
    });

    console.log(this.matricula.programa.codigo);
    
  }
  selectUsuario(event: Event): void{
    const target = event.target as HTMLInputElement;  
    console.log("selecciona : " + this.selectUser.cedula +target+" "+ typeof(target.value));
    
    this.usuarios.find(u => {
      if(u.cedula == this.selectUser.cedula){
        this.matricula.usuario = u;
      }
    });

    console.log(this.matricula.usuario.cedula);
    
  }

  /*exportTable(): void{
    const downloadLink = document.createElement('a');
    const dataType = 'matriculas/vnd.ms-excel';
    const table = document.getElementById('tabla-matricula');
    const tableHtml = table.outerHTML.replace(/ /g, '%20');
    const fileName = "matriculas.xlsx";
    document.body.appendChild(downloadLink);
    downloadLink.href = 'data' + dataType + ' ' + tableHtml;
    downloadLink.download = 'matriculas.xlsx';
    downloadLink.click();
  }*/

  exportTable(){
    let a =  [];
    this.matriculas.forEach(function (value) {
      a = [
        value.estado, 
        value.fechaMatricula, 
        value.id, 
        value.programa.nombre, 
        value.usuario.nombre, 
        value.valor];
    });

    const pdfDefinition: any = {
      content:[{text: 'Reporte de matriculas', style: 'subheader'},
      'La siguiente tabla contiene informacion de las matriculas',
      {
        style: 'tableExample',
        table: {
          body: [
            ['Estado', 'Fecha matricula', 'id', 'Programa','Usuario','Valor'],
            a
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


