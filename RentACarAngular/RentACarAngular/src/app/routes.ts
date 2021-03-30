import {Routes} from '@angular/router';
import {CarComponent} from './components/car/car.component';
import {SharedComponent} from './components/shared/shared.component';
import {AuthorizedComponent} from './components/authorized/authorized.component';
import {ModeratorGuard} from './guards/moderator.guard';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {CustomerComponent} from './components/customer/customer.component';
import {UserComponent} from './components/user/user.component';
import {LoginGuard} from './guards/login.guard';
import {ColorComponent} from './components/color/color.component';
import {ColorAddComponent} from './components/color/color-add/color-add.component';
import {ColorEditComponent} from './components/color/color-edit/color-edit.component';
import {BrandComponent} from './components/brand/brand.component';
import {BrandAddComponent} from './components/brand/brand-add/brand-add.component';
import {BrandEditComponent} from './components/brand/brand-edit/brand-edit.component';
import {CarAddComponent} from './components/car/car-add/car-add.component';
import {CarEditComponent} from './components/car/car-edit/car-edit.component';
import {CarDetailComponent} from './components/car/car-detail/car-detail.component';
import {RentalComponent} from './components/rental/rental.component';
import {PaymentComponent} from './components/payment/payment.component';
import {CartComponent} from './components/cart/cart.component';
import {CarListComponent} from './components/car/car-list/car-list.component';
import {CarImageAddComponent} from './components/car/car-image/car-image-add/car-image-add.component';
import {CarImageEditComponent} from './components/car/car-image/car-image-edit/car-image-edit.component';

export const appRoutes: Routes = [
  {
    path: 'authorized',
    component: AuthorizedComponent,
    canActivate: [ModeratorGuard],
    children: [
      {path: '', component: CarListComponent},
      {path: 'cars', component: CarComponent},
      {path: 'users', component: CarComponent},
      {path: 'customers', component: CustomerComponent},
      {path: 'colors/add', component: ColorAddComponent},
      {path: 'colors/update/:id', component: ColorEditComponent},
      {path: 'brands/add', component: BrandAddComponent},
      {path: 'brands/update/:id', component: BrandEditComponent},
      {path: 'cars/add', component: CarAddComponent},
      {path: 'cars/update/:id', component: CarEditComponent},
      {path: 'cars/image/add/:id', component: CarImageAddComponent},
      {path: 'cars/image/delete/:id', component: CarImageEditComponent},
      {path: 'rentals', component: RentalComponent},
    ]
  },
  {path: 'register', component: RegisterComponent},
  {path: 'payment/:myrental', component: PaymentComponent},
  {path: 'colors', component: ColorComponent},
  {path: 'brands', component: BrandComponent},
  {path: 'login', component: LoginComponent},
  {path: 'cart', component: CartComponent, canActivate: [LoginGuard]},
  {path: 'profile', component: UserComponent, canActivate: [LoginGuard]},
  {
    path: '',
    component: SharedComponent,
    children: [
      {path: '', component: CarComponent},
      {path: 'cars', component: CarComponent},
      {path: 'cars/brand/:brandId', component: CarComponent},
      {path: 'cars/color/:colorId', component: CarComponent},
      {path: 'car/details/:carId', component: CarDetailComponent},
      {path: 'cars/brand/:brandId/color/:colorId', component: CarComponent},
    ]
  },
  {path: '**', component: NotFoundComponent},

  // //Others
  // {path: 'about', component: AboutComponent},
  // {path: 'contact', component: ContactComponent},
  // {path: 'content', component: ContentComponent},
  // {path: '**', redirectTo: 'content', pathMatch: 'full'}

];
