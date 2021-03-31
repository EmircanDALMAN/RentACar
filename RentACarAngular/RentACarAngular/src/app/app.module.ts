import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NavComponent} from './components/nav/nav.component';
import {CarFilterPipe} from './pipes/car-filter.pipe';
import {appRoutes} from './routes';
import {RouterModule} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {ContentComponent} from './components/content/content.component';
import {BrandComponent} from './components/brand/brand.component';
import {CarComponent} from './components/car/car.component';
import {ColorComponent} from './components/color/color.component';
import {CustomerComponent} from './components/customer/customer.component';
import {RentalComponent} from './components/rental/rental.component';
import {LoadingComponent} from './components/loading/loading.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ChangePasswordComponent} from './components/change-password/change-password.component';
import {FooterComponent} from './components/footer/footer.component';
import {HowWeWorkComponent} from './components/how-we-work/how-we-work.component';
import {AboutComponent} from './components/about/about.component';
import {ContactComponent} from './components/contact/contact.component';
import {CarEditComponent} from './components/car/car-edit/car-edit.component';
import {CarDetailComponent} from './components/car/car-detail/car-detail.component';
import {NgbAlertModule, NgbModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';

import {ToastrModule} from 'ngx-toastr';
import {CartComponent} from './components/cart/cart.component';
import {PaymentComponent} from './components/payment/payment.component';
import {FilterComponent} from './components/filter/filter.component';
import {CarAddComponent} from './components/car/car-add/car-add.component';
import {BrandAddComponent} from './components/brand/brand-add/brand-add.component';
import {ColorAddComponent} from './components/color/color-add/color-add.component';
import {ColorEditComponent} from './components/color/color-edit/color-edit.component';
import {BrandEditComponent} from './components/brand/brand-edit/brand-edit.component';
import {AuthInterceptor} from './interceptors/auth.interceptor';
import {ErrorInterceptor} from './interceptors/error.interceptor';
import {UserComponent} from './components/user/user.component';
import {FindeksComponent} from './components/findeks/findeks.component';
import {SharedComponent} from './components/shared/shared.component';
import {AuthorizedComponent} from './components/authorized/authorized.component';
import {StartComponent} from './components/start/start.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {OtherComponent} from './components/other/other.component';
import {SidebarComponent} from './components/authorized/sidebar/sidebar.component';
import {CarListComponent} from './components/car/car-list/car-list.component';
import {CommonModule} from '@angular/common';
import {CarImageComponent} from './components/car/car-image/car-image.component';
import {CarImageAddComponent} from './components/car/car-image/car-image-add/car-image-add.component';
import {CarImageEditComponent} from './components/car/car-image/car-image-edit/car-image-edit.component';
import {UserAddComponent} from './components/user/user-add/user-add.component';
import {UserEditComponent} from './components/user/user-edit/user-edit.component';
import {ColorListComponent} from './components/color/color-list/color-list.component';
import {BrandListComponent} from './components/brand/brand-list/brand-list.component';
import {UserListComponent} from './components/user/user-list/user-list.component';
import {CustomerAddComponent} from './components/customer/customer-add/customer-add.component';
import {CustomerEditComponent} from './components/customer/customer-edit/customer-edit.component';
import {RentalListComponent} from './components/rental/rental-list/rental-list.component';
import {CustomerListComponent} from './components/customer/customer-list/customer-list.component';

@NgModule({
  declarations: [AppComponent, NavComponent, CarFilterPipe, LoginComponent,
    RegisterComponent, ContentComponent, BrandComponent, CarComponent,
    ColorComponent, CustomerComponent, RentalComponent, LoadingComponent,
    ChangePasswordComponent, FooterComponent, HowWeWorkComponent, AboutComponent,
    ContactComponent, CarEditComponent, CarDetailComponent, CartComponent,
    PaymentComponent, FilterComponent, CarAddComponent, BrandAddComponent, ColorAddComponent,
    ColorEditComponent, BrandEditComponent, UserComponent, FindeksComponent, SharedComponent,
    AuthorizedComponent, StartComponent, NotFoundComponent, OtherComponent, SidebarComponent,
    CarListComponent,
    CarImageComponent,
    CarImageAddComponent,
    CarImageEditComponent,
    UserAddComponent,
    UserEditComponent,
    ColorListComponent,
    BrandListComponent,
    UserListComponent,
    CustomerAddComponent,
    CustomerEditComponent,
    RentalListComponent,
    CustomerListComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot({positionClass: 'toast-bottom-right'}),
    NgbPaginationModule,
    NgbAlertModule,
    FormsModule,
    FontAwesomeModule,
    RouterModule.forRoot(appRoutes),
    NgbModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
