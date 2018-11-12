import { Component, OnInit, OnDestroy } from '@angular/core';
import {select, Store} from "@ngrx/store";
import * as fromRoot from "../store/reducers/reducer.factory";
import {untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";
import * as cartActions from "../store/actions/cart.actions";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  cart: any[];
  totalAmount: number;
  totalNumberOfProducts: number;
  isAddedToCart: boolean;
  addToCartLoading: boolean;
  getCartLoading: boolean;
  decreaseCartLoading: boolean;
  deleteFromCartLoading: boolean;
  orderIsPlaced: boolean = false;

  constructor(private store: Store<fromRoot.AppState>, private toastr: ToastrService) { }

  ngOnInit() {
    this.store.dispatch(new cartActions.FetchCart());
    this.store.pipe(select(fromRoot.getCart)).pipe(
      untilComponentDestroyed(this)
    ).subscribe((state) => {
      this.cart = state.cart;
      this.totalAmount = state.totalAmount;
      this.totalNumberOfProducts = state.totalNumOfProductsInCart;
      this.addToCartLoading = state.addToCartLoading;
      this.isAddedToCart = state.isAddedToCart;
      this.getCartLoading = state.getCartLoading;
      this.decreaseCartLoading = state.decreaseCartLoading;
      this.deleteFromCartLoading = state.deleteFromCartLoading;
    })
  }

  onOpenOrder() {
    this.orderIsPlaced = true;
  }

  ngOnDestroy() {
    this.store.dispatch(new cartActions.RemoveIsAddedToCart());
  }

}
