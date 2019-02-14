import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import * as cartActions from "../../store/actions/cart.actions";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../store/reducers/reducer.factory";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit, OnChanges {
  @Input() cartItem;
  @Input() totalNumberOfProducts;
  @Input() isAddedToCart;
  @Input() message;
  imagePath: string;

  constructor(private store: Store<fromRoot.AppState>,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.imagePath = this.cartItem.images[0];
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['message'] && changes['message'].currentValue) {
      setTimeout(() => {
        this.toastr.info(`${this.message}`);
      }, 0);
    }
  }

  increaseProductsQuantity() {
    this.store.dispatch(new cartActions.AddProductToCart({
      size_id: this.cartItem['size_id'], quantity: 1, product_id: this.cartItem['product_id']
    }));
  }

  decreaseProductsQuantity() {
    this.store.dispatch(new cartActions.DecreaseQuantityOfProductInCart({
      product_id: this.cartItem['product_id'], size_id: this.cartItem['size_id']
    }));
  }

  deleteProductFromCart() {
    this.store.dispatch(new cartActions.DeleteProductFromCart({
      id: this.cartItem['id']
    }));
  }

  openProductDetails() {
    this.router.navigate(['shop/products', this.cartItem['product_id']]);
  }
}
