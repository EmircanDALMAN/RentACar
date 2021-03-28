import {Injectable} from '@angular/core';
import {Car} from '../models/entityModels/car';
import {CartItems} from '../models/entityModels/cartItems';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private toastrService: ToastrService) {
  }

  addToCart(car: Car) {
    CartItems.car = car;
  }

  removeFromCart(car: Car) {
    CartItems.car = undefined;
    this.toastrService.error(car.brandName + ' ' + car.description, 'Başarıyla Kaldırıldı');
  }

  getCart() {
    return CartItems;
  }
}
