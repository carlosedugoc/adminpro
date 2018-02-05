import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Rutas
import { APP_ROUTES } from "./app.routes";

//Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

//Módulos
import { PagesModule } from "./pages/pages.module";
import { FormsModule } from "@angular/forms";
import { SettingsService } from './servives/settings.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule,
    FormsModule
  ],
  providers: [SettingsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
