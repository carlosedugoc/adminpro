import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  subscription: Subscription

  constructor() {
    

    this.subscription = this.regresaObservable()
    .subscribe( 
      numero=> console.log('subs', numero),
      error => console.error('error en el obs', error),
      ()=> console.log('el observador terminó')
    )
   }

  ngOnInit() {
    
  }

  regresaObservable(): Observable<any>{
    return new Observable(observer=>{
      let contador = 0
      let intervalo = setInterval(()=>{
        contador += 1

        let salida = {
          valor: contador
        }

        observer.next(salida)
        // if(contador ===3){
        //   clearInterval(intervalo)
        //   observer.complete()
        // }
        // if(contador===2){
        //   observer.error('Auxilio!!')
        // }
      },500)
    })
    .retry(2)
    .map((resp:any)=>{
      return resp.valor
    })
    .filter((valor, index)=>{
      if(valor % 2 === 1){
        return true
      }else{
        return false
      }
    })
  }

}
