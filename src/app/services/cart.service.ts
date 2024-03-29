import { Injectable } from '@angular/core';
import { CarDetail } from '../models/carDetail';
import { CartItems } from '../models/cartItems';
import { CartItem } from '../models/cartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  addToCart(carDetail:CarDetail){
    let item=CartItems.find(c=>c.carDetail.carId===carDetail.carId);
    if(item){

      item.quantity+=1;
    }else{
      let cartItem=new CartItem();
      cartItem.carDetail=carDetail;
      cartItem.quantity=1;
      CartItems.push(cartItem)
    }
  }
  removeFromCart(carDetail:CarDetail){
    let item=CartItems.find(c=>c.carDetail.carId===carDetail.carId);
    if(item){
      CartItems.splice(CartItems.indexOf(item),1)
    }
  }
  list():CartItem[]{
    return CartItems;
  }
}
