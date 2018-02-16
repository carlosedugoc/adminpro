import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable()
export class UsuarioService {
  usuario: Usuario
  token: string
  constructor(
    public http: HttpClient,
    public router: Router,
    public subirArchivo: SubirArchivoService
  ) {
    this.cargarStorage()
  }

  estaLogueado() {
    return (this.token.length > 5) ? true : false
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token')
      this.usuario = JSON.parse(localStorage.getItem('usuario'))
    } else {
      this.usuario = null
      this.token = ''
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id)
    localStorage.setItem('token', token)
    localStorage.setItem('usuario', JSON.stringify(usuario))
    this.usuario = usuario
    this.token = token
  }

  crearUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario'
    return this.http.post(url, usuario).map((res: any) => {

      swal('usuario creado', usuario.email, 'success')

    })
  }

  actualizarUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario/' + usuario._id
    url += '?token=' + this.token
    return this.http.put(url, usuario)
      .map((resp: any) => {
        if(usuario._id === this.usuario._id){
          let usuarioDB: Usuario = resp.usuario
          this.guardarStorage(usuarioDB._id, this.token, usuarioDB)
        }
        swal('Usuario actualizado', usuario.nombre, 'success')
        return true
      })
  }

  logOut() {
    this.usuario = null
    this.token = ''
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')

    this.router.navigate(['/login'])
  }

  loginGoogle(token: string) {
    let url = URL_SERVICIOS + '/login/google'
    return this.http.post(url, { token }).map((resp: any) => {
      this.guardarStorage(resp.id, resp.token, resp.usuario)
      return true
    })
  }
  login(usuario: Usuario, recordar: boolean = false) {
    if (recordar) {
      localStorage.setItem('email', usuario.email)
    } else {
      localStorage.removeItem('email')
    }

    let url = URL_SERVICIOS + '/login'
    return this.http.post(url, usuario).map((resp: any) => {
      this.guardarStorage(resp.id, resp.token, resp.usuario)
      return true
    })
  }

  cambiarImagen(archivo: File, id: string) {
    this.subirArchivo.subirArchivo(archivo, 'usuarios', id)
      .then((resp: any) => {
        this.usuario.img = resp.usuario.img
        swal('Imagen actualizada', this.usuario.nombre, 'success')
        this.guardarStorage(id, this.token, this.usuario)
      }).catch(resp => {
        console.log(resp)
      })
  }

  cargarUsuarios(desde: number = 0) {
    let url = URL_SERVICIOS + '/usuario?desde=' + desde
    return this.http.get(url)
  }

  buscarUsuario(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino
    return this.http.get(url).map((resp: any) => resp.usuarios)
  }

  borrarUsuarios(id: string) {
    let url = URL_SERVICIOS + '/usuario/' + id
    url += '?token=' + this.token

    return this.http.delete(url).map(resp=>{
      swal('Usuario borrado','El usuario fue borrado correctamente', 'success')
      return true
    })
  }
}
