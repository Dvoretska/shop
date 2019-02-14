import {Component, OnInit, OnDestroy, Inject} from '@angular/core';
import {select, Store} from "@ngrx/store";
import * as fromRoot from "../../store/reducers/reducer.factory";
import {untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";
import * as cartActions from "../../store/actions/cart.actions";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-cart',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit, OnDestroy {
  cart: any[];
  totalAmount: number;
  totalNumberOfProducts: number;
  isAddedToCart: boolean;
  addToCartLoading: boolean;
  getCartLoading: boolean;
  decreaseCartLoading: boolean;
  deleteFromCartLoading: boolean;
  message: string;

  constructor(private store: Store<fromRoot.AppState>,
              private toastr: ToastrService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.store.dispatch(new cartActions.FetchCart());
    this.store.pipe(select(fromRoot.getCart)).pipe(
      untilComponentDestroyed(this)
    ).subscribe((state) => {
      this.cart = state.cart;
      this.message = state.message;
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
    this.router.navigate(['order'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.store.dispatch(new cartActions.RemoveIsAddedToCart());
  }

}
