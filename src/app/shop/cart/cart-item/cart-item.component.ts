import { Component, OnInit, Input } from '@angular/core';
import {environment} from "../../../../environments/environment";
import * as cartActions from "../../store/actions/cart.actions";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../store/reducers/reducer.factory";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
  @Input() cartItem;
  @Input() totalNumberOfProducts;
  @Input() isAddedToCart;
  imagePath: string;

  constructor(private store: Store<fromRoot.AppState>, private router: Router) { }

  ngOnInit() {
    this.imagePath = `${environment.API_URL}/${this.cartItem.images[0]}`;
  }

  increaseProductsQuantity() {
    this.store.dispatch(new cartActions.AddProductToCart({
      size: this.cartItem['size'], quantity: 1, product_id: this.cartItem['product_id']
    }));
  }

  deleteProductFromCart() {
    this.store.dispatch(new cartActions.DeleteProductFromCart({
      id: this.cartItem['id']
    }));
  }

  decreaseProductsQuantity() {
    this.store.dispatch(new cartActions.DecreaseQuantityOfProductInCart({
      product_id: this.cartItem['product_id'], size: this.cartItem['size']
    }));
  }

  openProductDetails() {
    this.router.navigate(['shop/products', this.cartItem['product_id']]);
  }
}
