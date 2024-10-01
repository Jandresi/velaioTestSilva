import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PersonaDto, TareaDto } from 'src/app/interfaces/tarea.dto';
import { TareasService } from 'src/app/services/tareas.service';

@Component({
  selector: 'app-crear-tarea',
  templateUrl: './crear-tarea.component.html',
  styleUrls: ['./crear-tarea.component.scss']
})
export class CrearTareaComponent {
  formularioTarea:FormGroup;
  formularioPersona:FormGroup;
  formularioHabilidades:FormGroup;
  personasAsociadas:PersonaDto[] = [];
  listaHabilidades:string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private tareaService: TareasService,
    private router: Router
  ) {
    this.formularioTarea = this.formBuilder.group({
      nameTarea: ['', [Validators.required, Validators.minLength(4)]],
      fechaFin: ['', Validators.required],
    });
    this.formularioPersona = this.formBuilder.group({
      nombre: ['',[ Validators.required, Validators.minLength(5)]],
      edad: ['', [Validators.required, Validators.min(18)]],
    });
    this.formularioHabilidades = this.formBuilder.group({
      habilidad: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  
  submitHabilidad() {
    if(!this.formularioHabilidades.valid) {
      this.toastr.warning('La habilidad no es válida');
      return;
    }

    const newHabilidad:string = this.formularioHabilidades.value.habilidad
    const existe = this.listaHabilidades.find(hab => hab.toLowerCase() === newHabilidad.toLowerCase());
    if(existe) {
      this.toastr.warning('La habilidad ya fue ingresada');
      return;
    }
    
    this.listaHabilidades.push(newHabilidad);
    this.formularioHabilidades.setValue({habilidad: ''});
  }

  eliminarHabilidad(habilidad:string) {
    const idx = this.listaHabilidades.findIndex(hab => hab.toLowerCase() === habilidad.toLowerCase());
    this.listaHabilidades.splice(idx, 1);
  }

  submitPersona() {
    if(!this.formularioPersona.valid) {
      this.identificarErroresPersona();
      return;
    }

    const repetido = this.personasAsociadas.find((per) => per.nombre === this.formularioPersona.value.nombre);
    if(repetido) {
      this.toastr.warning('La persona ya se encuentra registrada');
      return;
    }

    if(this.formularioHabilidades.value.habilidad) this.submitHabilidad(); // Si hay algo en el campo, lo guardamos primero

    if(!this.listaHabilidades.length) {
      this.toastr.warning('Debe ingresar al menos una habilidad');
      return;
    }

    // Emitimos los datos creados y cerramos el diálogo
    this.personasAsociadas.push({
      nombre: this.formularioPersona.value.nombre,
      edad: this.formularioPersona.value.edad,
      habilidades: this.listaHabilidades
    });

    this.formularioPersona.setValue({nombre: '', edad: ''});
    this.formularioHabilidades.setValue({habilidad: ''});
    this.listaHabilidades = [];
  }

  identificarErroresPersona():boolean {
    const errores = [];
    const {nombre, edad} = this.formularioPersona.value;
    if(!nombre) errores.push('Debe ingresar un nombre');
    else if(nombre.split(' ').length < 2 || nombre.trim().length < 5) errores.push('El nombre no es válido');

    if(!edad) errores.push('Debe ingresar una edad');
    else if(edad<18) errores.push('La edad no es válida');

    if(errores.length) {
      errores.forEach((err:string) => this.toastr.warning(err));
      return false;
    }

    return true;
  }

  validarPersonaRepetida(personaBuscar:PersonaDto) {
    let repetido = false;
    const existe = this.personasAsociadas.find(persona => persona.nombre.toLowerCase() === personaBuscar.nombre.toLowerCase());
    if(existe) repetido = true;
    return repetido;
  }

  eliminarPersona(persona:PersonaDto) {
    const idx = this.personasAsociadas.findIndex(per => per.nombre.toLowerCase() === persona.nombre.toLowerCase());
    this.personasAsociadas.splice(idx, 1);
  }

  submitTarea() {
    const tareaGuardar:TareaDto = {
      nombre: this.formularioTarea.value.nameTarea,
      fechaFin: this.formularioTarea.value.fechaFin,
      personas: this.personasAsociadas,
      estado: 1
    }
    const valido = this.validarFormTarea(tareaGuardar);
    if(!valido) return;
    
    this.tareaService.crearTarea(tareaGuardar);
    this.router.navigate(['/tareas']);
    this.toastr.success('Tarea creada con éxito');
  }

  validarFormTarea(tarea:TareaDto) {
    const errores:string[] = [];
    const existe = this.tareaService.buscarTareaRepetida(tarea.nombre);
    if(existe) errores.push('Ya existe una tarea con este nombre');

    if(!tarea.nombre) errores.push('Debe ingresar un nombre para la tarea');
    else if(tarea.nombre.length < 5) errores.push('Nombre de tarea inválido');

    if(!tarea.fechaFin) errores.push('Debe ingresar una fecha final para la tarea');
    if(!tarea.personas.length) errores.push('Debe asignar al menos una persona a la tarea');

    if(errores.length) {
      errores.forEach(error => this.toastr.warning(error));
      return false;
    }
    return true;
  }
}
