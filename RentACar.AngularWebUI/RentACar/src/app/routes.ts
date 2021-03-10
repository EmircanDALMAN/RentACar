import {Routes} from '@angular/router';
import {CarComponent} from './components/car/car.component';
import {LoginComponent} from './components/login/login.component';

export const appRoutes: Routes = [
  {path: 'cars', component: CarComponent},
  {path: 'login', component: LoginComponent},
  { path: '**', redirectTo: 'cars', pathMatch: 'full' }
];
