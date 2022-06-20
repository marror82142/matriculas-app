import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { usuarioComponent } from './usuarios/usuario.component';
import { programaComponent } from './programas/programa.component';
import { matriculaComponent } from './matriculas/matricula.component';

import { usuarioService } from './usuarios/usuario.service';
import { programaService } from './programas/programa.service';
import { matriculaService } from './matriculas/matricula.service';


import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './usuarios/login.component';

const routes: Routes = [
  {path: '', redirectTo: '', pathMatch:'full'},
  {path: 'login', component: LoginComponent},
  {path: 'usuarios', component: usuarioComponent},
  {path: 'programas', component: programaComponent},
  {path: 'matriculas', component: matriculaComponent},
  
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    usuarioComponent,
    LoginComponent,
    programaComponent,
    matriculaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,    
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [usuarioService,programaService,matriculaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
