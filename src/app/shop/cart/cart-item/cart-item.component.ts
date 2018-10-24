import { Component, OnInit, Input } from '@angular/core';
import {environment} from "../../../../environments/environment";
import * as cartActions from "../../store/actions/cart.actions";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../store/reducers/reducer.factory";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
  @Input() cartItem;
  @Input() totalNumberOfProducts;
  @Input() amount;
  imagePath: string;

  constructor(private store: Store<fromRoot.AppState>) { }

  ngOnInit() {
    this.imagePath = `${environment.API_URL}/${this.cartItem.images[0]}`;
  }

  increaseProductsQuantity() {
    // console.log(this.amount)

    this.cartItem['quantity']++;
    this.totalNumberOfProducts++;
    this.store.dispatch(new cartActions.GetTotalAmount());
    this.store.dispatch(new cartActions.AddProductToCart({
      cart: {size: this.cartItem['size'], quantity: 1, product_id: this.cartItem['product_id']},
      totalNumber: this.totalNumberOfProducts
    }));
    // this.cartItem['amount'] = this.amount;
  }
}
