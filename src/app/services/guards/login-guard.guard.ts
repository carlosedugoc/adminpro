import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class LoginGuardGuard implements CanActivate {

  constructor(
    private usuarioService: UsuarioService
  ) { }
  canActivate() {

    if (this.usuarioService.estaLogueado) {
      console.log('PASO EL GUARD')
      return true
    } else {
      console.log('BLOQUEADO POR EL GUARD')
      return false
    }
  }
}
