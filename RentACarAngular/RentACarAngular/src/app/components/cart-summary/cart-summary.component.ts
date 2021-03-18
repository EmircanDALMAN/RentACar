import {Component, OnInit} from '@angular/core';
import {CartItem} from '../../models/entityModels/cartItem';
import {CartService} from '../../services/cart.service';
import {Car} from '../../models/entityModels/car';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {

  cartItems: CartItem[]=[];


  constructor(private cartService:CartService) {
  }

  ngOnInit(): void {
    this.getCart();
  }
  getCart(){
    this.cartItems = this.cartService.list();
  }
  removeFromCart(car:Car){
    this.cartService.removeFromCart(car);
  }
}
