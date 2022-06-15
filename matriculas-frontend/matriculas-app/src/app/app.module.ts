import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { usuarioComponent } from './usuarios/usuario.component';
import { programasComponent } from './usuarios/programas.component';
import { usuarioService } from './usuarios/usuario.service';
import { programasService } from './usuarios/programas.service';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './usuarios/login.component';

const routes: Routes = [
  {path: '', redirectTo: '', pathMatch:'full'},
  {path: 'login', component: LoginComponent},
  {path: 'usuarios', component: usuarioComponent},
  {path: 'programas', component: programasComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    usuarioComponent,
    LoginComponent,
    programasComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,    
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [usuarioService,programasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
