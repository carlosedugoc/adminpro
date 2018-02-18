import { Injectable } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable()
export class HospitalService {

  hospital: Hospital
  token: string

  constructor(
    public http: HttpClient,
    public router: Router,
    public usuairoService:UsuarioService,
    public subirArchivo:SubirArchivoService
  ) {  }

  cambiarImagen(archivo: File, id: string) {
    this.subirArchivo.subirArchivo(archivo, 'hospitales', id)
      .then((resp: any) => {
        this.hospital.img = resp.hospital.img
        swal('Imagen actualizada', this.hospital.nombre, 'success')
      }).catch(resp => {
        console.log(resp)
      })
  }

  cargarHospitales(desde: number = 0) {
    let url = URL_SERVICIOS + '/hospital?desde=' + desde
    return this.http.get(url)
  }

  obtenerHospital(id: string) {

  }

  borrarHospital(id: string) {
    let url = URL_SERVICIOS + '/hospital/' + id
    url += '?token=' + this.usuairoService.token
    console.log(url)
    return this.http.delete(url).map(resp => {
      swal('Hospital borrado', 'El hospital fue borrado correctamente', 'success')
      return true
    })
  }

  crearHospital(nombre: string) {
    let url = URL_SERVICIOS + '/hospital'
    return this.http.post(url, nombre).map((res: any) => {

      swal('hospital creado', nombre, 'success')

    })
  }

  buscarHospital(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino
    return this.http.get(url).map((resp: any) => resp.hospitales)
  }

  actualizarHospital(hospital: Hospital) {
    let url = URL_SERVICIOS + '/hospital/' + hospital._id
    url += '?token=' + this.token
    return this.http.put(url, hospital)
      .map((resp: any) => {
        if (hospital._id === this.hospital._id) {
          let hospitalDB: Hospital = resp.hospital
        }
        swal('hospital actualizado', hospital.nombre, 'success')
        return true
      })
  }
}
