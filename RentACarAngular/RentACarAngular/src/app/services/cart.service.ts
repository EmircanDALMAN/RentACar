import {Injectable} from '@angular/core';
import {Car} from '../models/entityModels/car';
import {CartItems} from '../models/entityModels/cartItems';
import {ToastrService} from 'ngx-toastr';
import {CartItem} from '../models/entityModels/cartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private toastrService: ToastrService) {
  }

  addToCart(car: Car) {
    let item = CartItems.find(c => c.car.id === car.id);
    if (item) {
      this.toastrService.error('Araç Zaten Sepetinizde Mevcut');
    } else {
      let cartItem = new CartItem();
      cartItem.car = car;
      cartItem.quantity = 1;
      CartItems.push(cartItem);
      this.toastrService.success('Sepete Eklendi', car.brandName);
    }
  }

  removeFromCart(car: Car) {
    let item = CartItems.find(c => c.car.id === car.id);
    if (item != null) {
      CartItems.splice(CartItems.indexOf(item), 1);
    }
  }

  list(): CartItem[] {
    return CartItems;
  }
}
