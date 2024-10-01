import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaTareasComponent } from './views/lista-tareas/lista-tareas.component';
import { CrearTareaComponent } from './views/crear-tarea/crear-tarea.component';

const routes: Routes = [
  { path:'tareas', component: ListaTareasComponent },
  { path:'crear', component: CrearTareaComponent },
  { path: '**', redirectTo: 'tareas' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
