import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { PersonaDto } from 'src/app/interfaces/tarea.dto';

@Component({
  selector: 'app-modal-habilidades',
  templateUrl: './modal-habilidades.component.html',
  styleUrls: ['./modal-habilidades.component.scss']
})
export class ModalHabilidadesComponent {
  @Input() persona?: PersonaDto;
  @Input() modalRef!: BsModalRef;
}
