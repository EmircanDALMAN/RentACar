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
import {CartComponent} from './components/cart/cart.component';
import {PaymentComponent} from './components/payment/payment.component';
import {CarAddComponent} from './components/car/car-add/car-add.component';
import {BrandAddComponent} from './components/brand/brand-add/brand-add.component';
import {ColorAddComponent} from './components/color/color-add/color-add.component';
import {CarEditComponent} from './components/car/car-edit/car-edit.component';
import {ColorEditComponent} from './components/color/color-edit/color-edit.component';
import {BrandEditComponent} from './components/brand/brand-edit/brand-edit.component';
import {LoginGuard} from './guards/login.guard';

export const appRoutes: Routes = [
  //Users
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'changepassword', component: ChangePasswordComponent},
  {path: 'customers', component: CustomerComponent},

  //Colors
  {path: 'colors', component: ColorComponent},
  {path: 'colors/add', component: ColorAddComponent, canActivate: [LoginGuard]},
  {path: 'colors/update/:id', component: ColorEditComponent, canActivate: [LoginGuard]},

  //Brands
  {path: 'brands', component: BrandComponent},
  {path: 'brands/add', component: BrandAddComponent, canActivate: [LoginGuard]},
  {path: 'brands/update/:id', component: BrandEditComponent, canActivate: [LoginGuard]},

  //Cars
  {path: 'cars', component: CarComponent},
  {path: 'cars/add', component: CarAddComponent, canActivate: [LoginGuard]},
  {path: 'cars/update/:id', component: CarEditComponent, canActivate: [LoginGuard]},
  {path: 'cars/brand/:brandId', component: CarComponent},
  {path: 'cars/color/:colorId', component: CarComponent},
  {path: 'car/details/:carId', component: CarDetailComponent},
  {path: 'cars/brand/:brandId/color/:colorId', component: CarComponent},

  //Rentals
  {path: 'rentals', component: RentalComponent},

  //Payment
  {path: 'payment/:myrental', component: PaymentComponent},
  {path: 'cart', component: CartComponent},

  //Others
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'content', component: ContentComponent},
  {path: '', component: CarComponent},
  {path: '**', redirectTo: 'content', pathMatch: 'full'}

];
