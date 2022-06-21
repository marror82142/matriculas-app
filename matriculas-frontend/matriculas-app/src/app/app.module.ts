import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { usuarioComponent } from './usuarios/usuario.component';
import { programaComponent } from './programas/programa.component';
import { usuarioService } from './usuarios/usuario.service';
import { programaService } from './programas/programa.service';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './usuarios/login.component';

const routes: Routes = [
  {path: '', redirectTo: '', pathMatch:'full'},
  {path: 'login', component: LoginComponent},
  {path: 'usuarios', component: usuarioComponent},
  {path: 'programas', component: programaComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    usuarioComponent,
    LoginComponent,
    programaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,    
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [usuarioService,programaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
