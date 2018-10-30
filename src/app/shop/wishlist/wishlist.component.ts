import { Component, OnInit, OnDestroy } from '@angular/core';
import {select, Store} from "@ngrx/store";
import * as fromRoot from "../store/reducers/reducer.factory";
import * as WishlistActions from "../store/actions/wishlist.actions";
import {untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit, OnDestroy {
  wishlist: any[];
  totalNumOfProductsInWishlist: number;
  getWishlistLoading: boolean;
  deleteFromWishlistLoading: boolean;
  sizes: string[];
  addToCartWasClicked: boolean = false;


  constructor(private store: Store<fromRoot.AppState>) { }

  ngOnInit() {
    this.store.dispatch(new WishlistActions.FetchWishlist());
    this.store.pipe(select(fromRoot.getWishlist)).pipe(
      untilComponentDestroyed(this)
    ).subscribe((state) => {
      this.wishlist = state.wishlist;
      this.totalNumOfProductsInWishlist = state.totalNumOfProductsInWishlist;
      this.getWishlistLoading = state.getWishlistLoading;
      this.deleteFromWishlistLoading = state.deleteFromWishlistLoading;
    });
    this.store.pipe(select(fromRoot.getProducts)).pipe(
      untilComponentDestroyed(this)
    ).subscribe((state) => {
      this.sizes = state.sizes;
    });

  }

  ngOnDestroy() {}
}
