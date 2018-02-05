import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { setInterval } from 'timers';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit {

  constructor() {
    let obs = new Observable(observer=>{
      let contador = 0
      let intervalo = setInterval(()=>{
        contador += 1
        observer.next(contador)
        if(contador ===3){
          clearInterval(intervalo)
          observer.complete()
        }
        if(contador===2){
          observer.error('Auxilio!!')
        }
      },1000)
    })

    obs.subscribe( 
      numero=> console.log('subs', numero),
      error => console.error('error en el obs', error),
      ()=> console.log('el observador terminó')
    )
   }

  ngOnInit() {
  }

}
