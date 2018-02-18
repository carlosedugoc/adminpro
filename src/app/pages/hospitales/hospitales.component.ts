import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/hospital/hospital.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';


declare var swal: any

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html'
})
export class HospitalesComponent implements OnInit {
  hospitales: Hospital[] = []
  desde: number = 0
  totalRegistros: number = 0
  cargando: boolean

  constructor(public hospitalService: HospitalService, public modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarHospitales()
    this.modalUploadService.notificacion.subscribe(resp =>{
      this.cargarHospitales()
    })
  }

  cargarHospitales() {
    this.hospitalService.cargarHospitales(this.desde).subscribe((resp: any) => {
      this.totalRegistros = resp.total
      this.hospitales = resp.hospitales
    })
  }

  cambiarDesde(valor: number) {
    let desde = this.desde + valor

    if (desde >= this.totalRegistros) return
    if (desde < 0) return

    this.desde += valor
    this.cargarHospitales()
  }

  buscarHospital(termino:string){
    if (termino.length <= 0) {
      this.cargarHospitales()
      return
    }
    this.cargando = true
    this.hospitalService.buscarHospital(
      termino).subscribe((hospitales: Hospital[]) => {
      this.hospitales = hospitales
      this.cargando = false
    })
  }

  borrarHospital(hospital: Hospital) {

    swal({
      title: '¿Esta seguro?',
      text: 'Está a punto de borrar a ' + hospital.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(borrar => {
      if (borrar) {
        this.hospitalService.borrarHospital(hospital._id).subscribe(resp => {
          console.log(resp)
          this.cargarHospitales()
        })
      }
    })

  }

  guardarHospital(hospital: Hospital) {
    this.hospitalService.actualizarHospital(hospital).subscribe()
  }


  mostrarModal(id: string) {
    this.modalUploadService.mostrarModal('hospitales', id)
  }

}
