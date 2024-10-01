import { Injectable, signal } from '@angular/core';
import { TareaDto } from '../interfaces/tarea.dto';

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  listaTareas = signal<TareaDto[]>([]);

  constructor() { }

  // Obtener tareas
  get tareas() {
    return this.listaTareas();
  }

  // Refrescar lista de tareas
  set tareas(tareas:TareaDto[]) {
    this.listaTareas.set(tareas);
  }

  // Muestra las tareas pendientes o completadas y si se envía un estado, filtra solo por ese estado
  buscarTareas(estado?:number|string|null) {
    if(!estado) return this.tareas.filter((res:TareaDto) => res.estado != 0);
    return this.tareas.filter((res:TareaDto) => res.estado == estado);
  }

  // Crea una tarea nueva
  crearTarea(tarea:TareaDto) {
    tarea.id = this.tareas.length;
    this.tareas.push(tarea);
    return this.tareas;
  }

  // Edita una tarea existente
  editarTarea(nuevosDatos:TareaDto) {
    const idxEditar = this.tareas.findIndex((res:TareaDto) => res.id === nuevosDatos.id);
    this.tareas[idxEditar] = nuevosDatos;
    return this.tareas[idxEditar];
  }

  // Pone en estado cero la tarea
  eliminarTarea(id?:number) {
    const idx = this.tareas.findIndex((res:TareaDto) => res.id === id);
    this.tareas[idx].estado = 0;
  }

  // Busca si la tarea ya existe
  buscarTareaRepetida(nombre:string) {
    const existe = this.tareas.find((res:TareaDto) => res.nombre === nombre && res.estado!=0);
    if(existe) return true;
    return false;
  }

  // Retorna un objeto con el nombre del estado
  traducirEstado(estado:number) {
    const estados:any = {
      1: {nombre: 'Pendiente', color: 'badge rounded-pill py-1 text-bg-warning'},
      2: {nombre: 'Terminada', color: 'badge rounded-pill py-1 text-bg-success'},
    }
    return estados[estado];
  }
}
