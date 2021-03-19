import {Component, OnInit} from '@angular/core';
import {CartService} from '../../services/cart.service';
import {CartItem} from '../../models/entityModels/cartItem';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {RentalService} from '../../services/rental.service';
import {Rental} from '../../models/entityModels/rental';
import {ToastrService} from 'ngx-toastr';
import {RentalDetail} from '../../models/entityModels/RentalDetail';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: CartItem[] = [];
  model = new NgbDate(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate());
  totalPrice: number = 0;
  rentalResponse: Rental[];
  returnDate: Date;
  now = new Date();
  baseUrl = environment.baseUrl;
  carDetailReturnDate: Date;

  constructor(private cartService: CartService,
              private rentalService: RentalService,
              private toastrService: ToastrService,
              private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.getCart();
    this.cartItems.forEach(v => {
      this.totalPrice += v.car.dailyPrice;
    });
    this.rentalService.getRentalByCar(this.cartItems[this.cartItems.length - 1].car.id).subscribe(response => {
      this.rentalResponse = response.data;
      console.log(this.rentalResponse);
      this.carDetailReturnDate = this.rentalResponse[this.rentalResponse.length - 1].returnDate;
      console.log(this.carDetailReturnDate);
    });
  }

  createRental() {
    if(!this.checkCarReturnDate()){
      this.router.navigate(['/cart']);
    }
    else if (this.checkCarReturnDate()){
      let MyRental: RentalDetail = {
        returnDate: new Date(this.model.year, this.model.month - 1, this.model.day + 1),
        carId: this.cartItems[0].car.id,
        customerId: 1
      };
      this.router.navigate(['/payment/', JSON.stringify(MyRental)]);
      this.toastrService.info('Ödeme sayfasına yönlendiriliyorsunuz...', 'Ödeme İşlemleri');
    }
  }

  checkCarReturnDate(): boolean {
    if (this.carDetailReturnDate != undefined) {
      var fullDate = this.carDetailReturnDate.toString().split('-', 3);
      var day = parseInt(fullDate[2]);
      var month = parseInt(fullDate[1]);
      var year = parseInt(fullDate[0]);
      var date1 = new Date(year, month, day);
      var date2 = new Date(this.model.year, this.model.month, this.model.day);
      if (date1.getUTCDate() >= date2.getUTCDate()) {
        this.toastrService.error('Araç bu tarihte kiradadır!');
        return false;
      }
    }
    return true;
  }

  getCart() {
    this.cartItems = this.cartService.list();
  }

}
