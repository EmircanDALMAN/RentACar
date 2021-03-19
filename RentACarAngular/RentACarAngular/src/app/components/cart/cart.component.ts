import {Component, OnInit} from '@angular/core';
import {CartService} from '../../services/cart.service';
import {CartItem} from '../../models/entityModels/cartItem';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {RentalService} from '../../services/rental.service';
import {Rental} from '../../models/entityModels/rental';
import {ToastrService} from 'ngx-toastr';
import {RentalDetail} from '../../models/entityModels/RentalDetail';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: CartItem[] = [];
  model = new NgbDate(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate());
  totalPrice: number = 0;
  rentalResponse: Rental[];
  returnDate: Date;
  now = new Date();

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
  }

  createRental() {
    let MyRental: RentalDetail = {
      returnDate: new Date(this.model.year, this.model.month, this.model.day),
      carId: 1,
      customerId: 1
    };
    this.router.navigate(['/payment/', JSON.stringify(MyRental)]);
    this.toastrService.info('Ödeme sayfasına yönlendiriliyorsunuz...', 'Ödeme İşlemleri');
  }

  getCart() {
    this.cartItems = this.cartService.list();
  }

  changeRentCar(id: number) {
    if (this.model !== undefined) {
      this.rentalService.getRentalByCar(id).subscribe(response => {
        this.rentalResponse = response.data;
        this.returnDate = this.rentalResponse[this.findIndex()].returnDate;
        if (!this.dateSetting()) {
          this.toastrService.error(this.rentalResponse[this.findIndex()].brandName + ' Şuan Kirada');
        }
      });
    } else {
      this.toastrService.error('Tarih Alanı Boş Bırakılamaz');
    }
  }

  findIndex() {
    return this.rentalResponse.length - 1;
  }

  dateSetting(): boolean {
    var deger = new Date(this.returnDate.toString()).toLocaleDateString();
    var splitted = deger.split('.', 3);
    var month = splitted[1];
    var splitted3 = month.slice(1, 2);
    if (this.model.year.toString() === splitted[2].toString()) {
      if (this.model.month.toString() === splitted3.toString()) {
        if (this.model.day.toString() === splitted[0].toString()) {
          return false;
        }
        return true;
      }
      return true;
    }
    return true;
  }
}
