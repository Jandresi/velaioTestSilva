import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ListaTareasComponent } from './views/lista-tareas/lista-tareas.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalHabilidadesComponent } from './components/modal-habilidades/modal-habilidades.component';
import { ToastrModule } from 'ngx-toastr';
import { CrearTareaComponent } from './views/crear-tarea/crear-tarea.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListaTareasComponent,
    ModalHabilidadesComponent,
    CrearTareaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
