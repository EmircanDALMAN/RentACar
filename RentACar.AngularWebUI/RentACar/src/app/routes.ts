import {Routes} from '@angular/router';
import {CarComponent} from './components/car/car.component';
import {LoginComponent} from './components/login/login.component';
import {ContentComponent} from './components/content/content.component';

export const appRoutes: Routes = [
  {path: 'cars', component: CarComponent},
  {path: 'login', component: LoginComponent},
  {path: 'content', component: ContentComponent},
  { path: '**', redirectTo: 'content', pathMatch: 'full' }
];
