import { Component, OnInit } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { MedicoService } from '../../services/medico/medico.service';
import { Medico } from '../../models/medico.model';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {
  medicos: Medico[] = []
  constructor(public medicoServices: MedicoService) { }

  ngOnInit() {
    this.cargarMedicos()
  }

  cargarMedicos() {
    this.medicoServices.cargarMedicos().subscribe((resp: any) => {
      this.medicos = resp
    })
  }

  buscarMedico(termino: string) {
    if (termino.length <= 0) {
      this.cargarMedicos()
      return
    }
    this.medicoServices.buscarMedico(termino).subscribe(medicos => this.medicos = medicos)
  }

  borrarMedico(medico: Medico) {
    this.medicoServices.borrarMedico(medico._id).subscribe(() => this.cargarMedicos())
  }

}
