import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { usuarioComponent } from './usuarios/usuario.component';
import { usuarioService } from './usuarios/usuario.service';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './usuarios/form.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './usuarios/login.component';

const routes: Routes = [
  {path: '', redirectTo: '', pathMatch:'full'},
  {path: 'login', component: LoginComponent},
  {path: 'usuarios', component: usuarioComponent},
  {path: 'usuarios/form', component: FormComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    usuarioComponent,
    FormComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [usuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
