import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {
  
  @Input('nombre') leyenda:string = 'Leyenda'
  @Input() progreso:number = 50
  constructor() { 
    
  }

  ngOnInit() {
  }

  cambiarValor(valor) {
    if (this.progreso >= 100 && valor >0){
      this.progreso = 100
      return
    } 

    if (this.progreso <= 0 && valor <0){
      this.progreso = 0
      return
    } 
    this.progreso = this.progreso + valor;
  }

}
