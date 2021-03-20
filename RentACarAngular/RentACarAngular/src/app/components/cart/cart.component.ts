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

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  baseUrl = environment.baseUrl;
  model = new NgbDate(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate());
  rentalResponse: Rental[];
  now = new Date();
  date: string;
  totalPrice: number = 0;
  carDetailReturnDate: Date;
  date1: number;
  date2: number;

  constructor(private cartService: CartService, private rentalService: RentalService,
              private  toastrService: ToastrService, private router: Router) {
  }

  ngOnInit(): void {
    this.getCart();
    if (this.cartService.list().length == 0) {
      this.toastrService.info('Sepetiniz Boş Yönlendiriliyor...');
      this.router.navigate(['/']);
    } else {
      this.totalPrice = this.cartItems[this.cartItems.length - 1].car.dailyPrice;
      this.rentalService.getRentalByCar(this.cartItems[this.cartItems.length - 1].car.id).subscribe(response => {
        this.rentalResponse = response.data;
        if (this.rentalResponse.forEach(p => p.returnDate) != undefined) {
          this.carDetailReturnDate = this.rentalResponse[this.rentalResponse.length - 1].returnDate;
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
    } else if (this.checkCarReturnDate()) {
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
      this.date1 = date1.getUTCDate();
      this.date2 = date2.getUTCDate();
      this.totalPrice = this.totalPrice * (date2.getUTCDate() - date1.getUTCDate());
      if (date1.getUTCDate() >= date2.getUTCDate()) {
        this.toastrService.error('Araç bu tarihte kiradadır!');
        return false;
      }
    }
    return true;
  }

  calculatePrice() {
    var date1 = new Date(this.now.getFullYear(), this.now.getMonth(), this.now.getDate());
    var date2 = new Date(this.model.year, this.model.month -1 , this.model.day);
    var timeDifference = Math.abs(date2.getTime() - date1.getTime());
    var dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

    console.log(dayDifference);
    if (dayDifference < date1.getDate()) {
      this.toastrService.error('Geçmiş Tarihe Araç Kiralayamazsınız');
    } else if (dayDifference === 0) {
      this.toastrService.error('Bugün Araç Teslim Edemezsiniz');
    } else {
      this.totalPrice = dayDifference * this.cartItems[this.cartItems.length - 1].car.dailyPrice;
    }
  }

  removeFromCart(car: Car) {
    this.cartService.removeFromCart(car);
    this.toastrService.error(car.brandName + ' ' + car.description, 'Başarıyla Kaldırıldı');
    if (this.cartService.list().length == 0) {
      this.toastrService.info('Anasayfa\'ya Yönlendiriliyor...');
      this.router.navigate(['/']);
    }
  }
}
