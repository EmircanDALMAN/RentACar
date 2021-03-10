import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {NavComponent} from './components/nav/nav.component';
import {CarComponent} from './components/car/car.component';
import {CarFilterPipe} from './pipes/car-filter.pipe';
import {appRoutes} from './routes';
import {RouterModule} from '@angular/router';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [AppComponent, NavComponent, CarComponent, CarFilterPipe, LoginComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
