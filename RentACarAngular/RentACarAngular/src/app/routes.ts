import {Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {ContentComponent} from './components/content/content.component';
import {BrandComponent} from './components/brand/brand.component';
import {CarComponent} from './components/car/car.component';
import {ColorComponent} from './components/color/color.component';
import {CustomerComponent} from './components/customer/customer.component';
import {RentalComponent} from './components/rental/rental.component';
import {RegisterComponent} from './components/register/register.component';
import {ChangePasswordComponent} from './components/change-password/change-password.component';
import {AboutComponent} from './components/about/about.component';
import {ContactComponent} from './components/contact/contact.component';
import {CarDetailComponent} from './components/car/car-detail/car-detail.component';

export const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'changepassword', component: ChangePasswordComponent},
  {path: 'content', component: ContentComponent},
  {path: 'brands', component: BrandComponent},
  {path: 'cars', component: CarComponent},
  {path: 'colors', component: ColorComponent},
  {path: 'customers', component: CustomerComponent},
  {path: 'rentals', component: RentalComponent},
  {path:"cars/brand/:brandId", component:CarComponent},
  {path:"cars/color/:colorId", component:CarComponent},
  { path: "car/details/:carId", component: CarDetailComponent },
  {path: '', component: CarComponent},
  {path: '**', redirectTo: 'content', pathMatch: 'full'}
];
