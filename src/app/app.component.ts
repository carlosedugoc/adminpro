import { Component } from '@angular/core';
import { SettingsService } from './servives/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private _ajustes:SettingsService){}
}
