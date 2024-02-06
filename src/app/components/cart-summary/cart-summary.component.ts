import { Component } from '@angular/core';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrl: './cart-summary.component.css'
})
export class CartSummaryComponent {
cartItems:CartItem[]=[];

}
