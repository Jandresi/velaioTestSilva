import { Component, Pipe, PipeTransform, signal } from '@angular/core';
import { TareaDto, PersonaDto } from 'src/app/interfaces/tarea.dto';
import { TareasService } from 'src/app/services/tareas.service';
import { FormGroup, FormControl } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ModalHabilidadesComponent } from 'src/app/components/modal-habilidades/modal-habilidades.component';

@Component({
  selector: 'app-lista-tareas',
  templateUrl: './lista-tareas.component.html',
  styleUrls: ['./lista-tareas.component.scss']
})
export class ListaTareasComponent {
  tituloPagina:string = 'Lista de tareas';
  tareasDisponibles = signal<TareaDto[]>([]);
  personaModal:PersonaDto = {nombre:'', edad:0, habilidades:[]};
  filtro = new FormGroup({
    estadoSeleccionado: new FormControl('')
  });
  
  constructor(
    private tareasService: TareasService,
    private modalService: BsModalService
  ) { }

  ngOnInit():void {
    this.buscarTareas();
    this.filtro.valueChanges.subscribe(valor => {
      this.buscarTareas();
    });
  }

  buscarTareas() {
    const allTareas = this.tareasService.buscarTareas(this.filtro.value.estadoSeleccionado);
    this.tareasDisponibles.set(allTareas);
  }

  traducirEstado(estado:number) {
    return this.tareasService.traducirEstado(estado);
  }

  toggleEstado(tarea:TareaDto, nuevoEstado:number) {
    tarea.estado = nuevoEstado;
    this.tareasService.editarTarea(tarea);
    this.buscarTareas();
  }

  eliminarTarea(id?:number) {
    this.tareasService.eliminarTarea(id);
    this.buscarTareas();
  }

  abrirModalHabilidades(persona:PersonaDto) {
    const modalRef = this.modalService.show(ModalHabilidadesComponent);
    if(modalRef.content) {
      modalRef.content.persona = persona;
      modalRef.content.modalRef = modalRef;
    }
  }
}