import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
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
import { CartComponent } from './components/cart/cart.component';
import { PaymentComponent } from './components/payment/payment.component';
import { FilterComponent } from './components/filter/filter.component';
@NgModule({
  declarations: [AppComponent, NavComponent, CarFilterPipe, LoginComponent, RegisterComponent, ContentComponent, BrandComponent, CarComponent,
    ColorComponent, CustomerComponent, RentalComponent, LoadingComponent, ChangePasswordComponent, FooterComponent, HowWeWorkComponent, AboutComponent,
    ContactComponent, CarEditComponent, CarDetailComponent, CartComponent, PaymentComponent, FilterComponent],
    imports: [
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
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
