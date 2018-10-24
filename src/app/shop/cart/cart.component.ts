import { Component, OnInit, OnDestroy } from '@angular/core';
import * as cartActions from "../store/actions/cart.actions";
import {select, Store} from "@ngrx/store";
import * as fromRoot from "../store/reducers/reducer.factory";
import {skip} from "rxjs/operators";
import {untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  cart: any[];
  totalAmount: number;
  totalNumberOfProducts: number;
  amount;
  isAdded;

  constructor(private store: Store<fromRoot.AppState>) { }

  ngOnInit() {
    this.store.dispatch(new cartActions.GetTotalAmount());
    this.store.pipe(select(fromRoot.getCart), skip(1)).pipe(
      untilComponentDestroyed(this)
    ).subscribe((state) => {
      this.cart = state.cart;
      this.totalAmount = state.totalAmount;
      this.totalNumberOfProducts = state.totalNumberOfProducts;
      this.isAdded = state.isAddedToCart;
        // this.amount = state.amount;


      console.log(this.cart)
    })
  }

  ngOnDestroy() {}

}
