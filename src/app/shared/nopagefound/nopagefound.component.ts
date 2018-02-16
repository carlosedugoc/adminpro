import { Component, OnInit } from '@angular/core';
declare function inic_plugins()
@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styles: []
})
export class NopagefoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    inic_plugins()
  }

}
