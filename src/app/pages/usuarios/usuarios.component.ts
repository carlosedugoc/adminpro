import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = []
  desde: number = 0
  totalRegistros: number = 0
  cargando: boolean

  constructor(public usuarioService: UsuarioService, public modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios()
    this.modalUploadService.notificacion.subscribe(resp =>{
      this.cargarUsuarios()
    })
  }

  cargarUsuarios() {
    this.usuarioService.cargarUsuarios(this.desde).subscribe((resp: any) => {
      this.totalRegistros = resp.total
      this.usuarios = resp.usuarios
    })

  }

  cambiarDesde(valor: number) {
    let desde = this.desde + valor

    if (desde >= this.totalRegistros) return
    if (desde < 0) return

    this.desde += valor
    this.cargarUsuarios()
  }

  buscarUsuario(termino: string) {
    if (termino.length <= 0) {
      this.cargarUsuarios()
      return
    }
    this.cargando = true
    this.usuarioService.buscarUsuario(termino).subscribe((usuarios: Usuario[]) => {
      this.usuarios = usuarios
      this.cargando = false
    })
  }

  borrarUsuario(usuario: Usuario) {
    if (usuario._id === this.usuarioService.usuario._id) {
      swal('no se puede borrar el usuario', 'No se puede borrar a si mismo', 'error')
      return
    }

    swal({
      title: '¿Esta seguro?',
      text: 'Está a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(borrar => {
      if (borrar) {
        this.usuarioService.borrarUsuarios(usuario._id).subscribe(resp => {
          console.log(resp)
          this.cargarUsuarios()
        })
      }
    })

  }

  guardarUsuario(usuario: Usuario) {
    this.usuarioService.actualizarUsuario(usuario).subscribe()
  }


  mostrarModal(id: string) {
    this.modalUploadService.mostrarModal('usuarios', id)
  }
}
