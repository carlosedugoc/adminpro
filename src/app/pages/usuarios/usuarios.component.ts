import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';

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

  constructor(public usuarioService: UsuarioService) { }

  ngOnInit() {
    this.cargarUsuarios()
  }

  cargarUsuarios() {
    this.usuarioService.cargarUsuarios(this.desde).subscribe((resp: any) => {
      this.totalRegistros = resp.totalRegistros
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
    if(termino.length <= 0){
      this.cargarUsuarios()
      return
    }
    this.cargando = true
    this.usuarioService.buscarUsuario(termino).subscribe((usuarios: Usuario[]) => {
      this.usuarios = usuarios
      this.cargando = false
    })
  }

}
