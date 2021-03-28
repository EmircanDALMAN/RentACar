import {Component, OnInit} from '@angular/core';
import {CartService} from '../../services/cart.service';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {RentalService} from '../../services/rental.service';
import {environment} from '../../../environments/environment';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {RentalDetail} from '../../models/entityModels/RentalDetail';
import {Rental} from '../../models/entityModels/rental';
import {Car} from '../../models/entityModels/car';
import {CartItem} from '../../models/entityModels/cartItem';
import {faCartPlus, faExclamation, faLiraSign} from '@fortawesome/free-solid-svg-icons';
import {LocalStorageService} from '../../services/local-storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  removeIcon = faExclamation;
  priceIcon = faLiraSign;
  cartIcon = faCartPlus;

  cartItems: CartItem[] = [];
  baseUrl = environment.baseUrl;
  now = new Date();
  rentalResponse: Rental[];
  date: string;
  totalPrice: number = 0;
  carDetailReturnDate: Date;
  minRentDate = new NgbDate(this.now.getFullYear(), this.now.getMonth(), this.now.getDate());
  minRentalDate = new NgbDate(this.now.getFullYear(), this.now.getMonth(), this.now.getDate() + 1);
  model = this.minRentalDate;
  rentDate = this.minRentDate;

  constructor(private cartService: CartService, private rentalService: RentalService,
              private  toastrService: ToastrService, private router: Router,
              private localStorageService: LocalStorageService) {
  }

  ngOnInit(): void {
    this.getCart();
    if (!this.checkCartLength()) {
      this.toastrService.info('Sepetiniz Boş. Yönlendiriliyorsunuz...');
      this.router.navigate(['/']);
    } else {
      this.totalPrice = this.cartItems[this.cartItems.length - 1].car.dailyPrice;
      this.rentalService.getRentalByCar(this.cartItems[this.cartItems.length - 1].car.id).subscribe(response => {
        if (response.data.length != 0) {
          this.rentalResponse = response.data;
          this.carDetailReturnDate = this.rentalResponse[this.rentalResponse.length - 1].returnDate;
          var fullDate = this.carDetailReturnDate.toString().split('-', 3);
          var year = parseInt(fullDate[0]);
          var month = parseInt(fullDate[1]);
          var day = parseInt(fullDate[2]);
          this.minRentDate = new NgbDate(year, month, day + 1);
          this.minRentalDate = new NgbDate(year, month, day + 2);
          this.model = this.minRentalDate;
          this.rentDate = this.minRentDate;
          this.toastrService.info('Minimum Alış Tarihi Aracın Dönüş Tarihine Göre Hesaplanmıştır.');
        }
      });
    }
  }

  getCart() {
    this.cartItems = this.cartService.list();
  }

  createRental() {
    if (!this.checkCarReturnDate()) {
      this.router.navigate(['/cart']);
    } else {
      let myRental: RentalDetail = {
        rentDate: new Date(this.rentDate.year, this.rentDate.month - 1, this.rentDate.day + 1),
        returnDate: new Date(this.model.year, this.model.month - 1, this.model.day + 1),
        carId: this.cartItems[0].car.id,
        userId: parseInt(this.localStorageService.getItem('id')),
      };
      this.router.navigate(['/payment/', JSON.stringify(myRental)]);
      this.toastrService.info('Ödeme sayfasına yönlendiriliyorsunuz...', 'Ödeme İşlemleri');
    }
  }

  checkCarReturnDate(): boolean {
    return !(!this.checkRentalDay()
      || !this.checkDateDifference());
  }

  checkDateDifference(): boolean {
    if (
      this.rentDate.year > this.model.year
      || this.rentDate.year == this.model.year && this.rentDate.month > this.model.month
      || this.rentDate.year == this.model.year && this.rentDate.month == this.model.month
      && this.rentDate.day > this.model.day) {
      this.toastrService.error('Alış Tarihiniz Teslim Tarihinden Büyük Olamaz!');
      return false;
    }
    return true;
  }

  calculatePrice() {
    if (this.checkDateDifference()) {
      var rentDate = new Date(this.rentDate.year, this.rentDate.month - 1, this.rentDate.day);
      var returnDate = new Date(this.model.year, this.model.month - 1, this.model.day);
      var timeDifference = Math.abs(returnDate.getTime() - rentDate.getTime());
      var dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
      this.totalPrice = dayDifference * this.cartItems[this.cartItems.length - 1].car.dailyPrice;
    } else {
      this.setTotalPriceValue();
    }

  }

  removeFromCart(car: Car) {
    this.cartService.removeFromCart(car);
    if (this.cartService.list().length == 0) {
      this.toastrService.info('Anasayfa\'ya Yönlendiriliyor...');
      this.router.navigate(['/']);
    }
  }

  checkCartLength(): boolean {
    return this.cartService.list().length != 0;
  }

  checkRentalDay(): boolean {
    if (this.rentDate.day == this.model.day) {
      this.toastrService.error
      ('Bugün Teslim Edilmek Şartıyla Araç Alınamaz. Teslim Tarihini Kontrol Ediniz..');
      return false;
    }
    return true;
  }

  setTotalPriceValue() {
    this.totalPrice = this.cartItems[this.cartItems.length - 1].car.dailyPrice;
  }
}
