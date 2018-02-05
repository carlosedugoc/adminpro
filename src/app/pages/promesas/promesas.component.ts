import { Component, OnInit } from '@angular/core';
import { setInterval } from 'timers';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {
   
this.contarTres()
  .then(()=> console.log('termino'))
  .catch(error => console.error('error en la promesa', error))

  }

  ngOnInit() {
  }

  contarTres(): Promise<boolean>{
    let promesa = new Promise<boolean>((resolve, reject) => {
      let contador = 0
      let intervalo = setInterval(() => {
        contador += 1
        if (contador === 3) {
          resolve(true)
          clearInterval(intervalo)
        }
      }, 1000)
    })
    return promesa
  }

}
