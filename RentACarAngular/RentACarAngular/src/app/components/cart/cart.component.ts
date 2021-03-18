import {Component, OnInit} from '@angular/core';
import {CartService} from '../../services/cart.service';
import {CartItem} from '../../models/entityModels/cartItem';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {RentalService} from '../../services/rental.service';
import {Rental} from '../../models/entityModels/rental';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: CartItem[] = [];
  model: NgbDateStruct;
  rentalResponse: Rental[];
  returnDate: string;
  now = new Date();

  constructor(private cartService: CartService,
              private rentalService: RentalService,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    this.cartItems = this.cartService.list();
  }

  goPayment() {
  }

  changeRentCar(id: number) {
    if (this.model !== undefined) {
      this.rentalService.getRentalByCar(id).subscribe(response => {
        this.rentalResponse = response.data;
        this.returnDate = this.rentalResponse[this.findIndex()].returnDate.toString();
        if (!this.dateSetting()) {
          this.toastrService.error(this.rentalResponse[this.findIndex()].brandName + ' Şuan Kirada');
        }
      });
    }
    else{
      this.toastrService.error('error');
    }

  }

  findIndex() {
    return this.rentalResponse.length - 1;
  }

  dateSetting(): boolean {
    var deger = new Date(this.returnDate.toString()).toLocaleDateString();
    var splitted2 = deger.split('.', 3);
    var month = splitted2[1];
    var splitted3 = month.slice(1, 2);
    if (this.model.year.toString() === splitted2[2].toString()) {
      if (this.model.month.toString() === splitted3.toString()) {
        if (this.model.day.toString() === splitted2[0].toString()) {
          return false;
        }
        return true;
      }
      return true;
    }
    return true;
  }
}
