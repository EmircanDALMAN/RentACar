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
import { RegisterComponent } from './components/register/register.component';
import { ContentComponent } from './components/content/content.component';
import { FooterComponent } from './components/footer/footer.component';
import { BlogComponent } from './components/blog/blog.component';
import { ServiceComponent } from './components/service/service.component';
import { HowweworkComponent } from './components/howwework/howwework.component';
import { CustomercommentsComponent } from './components/customercomments/customercomments.component';

@NgModule({
  declarations: [AppComponent, NavComponent, CarComponent, CarFilterPipe, LoginComponent, RegisterComponent, ContentComponent, FooterComponent, BlogComponent, ServiceComponent, HowweworkComponent, CustomercommentsComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
