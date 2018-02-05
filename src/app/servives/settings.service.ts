import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {

  constructor() {
    this.cargarAjustes()
  }

  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/defaults.css',
    tema: 'default'
  }

  guardarAjustes() {
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes))
  }

  cargarAjustes() {
    if (localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'))
      this.aplicarTema(this.ajustes.tema)
    }else{
      this.aplicarTema(this.ajustes.tema)
    }
  }

  aplicarTema(tema: string) {
    let url = `assets/css/colors/${tema}.css`
    document.getElementById('tema').setAttribute('href', url)

    this.ajustes.tema = tema
    this.ajustes.temaUrl = url

    this.guardarAjustes()
  }

}

interface Ajustes {
  temaUrl: string,
  tema: string
}
