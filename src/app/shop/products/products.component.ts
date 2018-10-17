import { Component, OnInit, OnDestroy } from '@angular/core';
import {Store, select} from "@ngrx/store";
import * as fromRoot from "../store/shop.reducer";
import {Observable, Subscription} from "rxjs";
import * as shopActions from "../store/shop.actions";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: any[];
  getState$: Observable<fromRoot.ShopState>;
  limit: number = 3;
  skip: number = 0;
  totalAmount: number;
  private getStateSubscription: Subscription;

  constructor(private store: Store<fromRoot.ShopState>) {
  }

  ngOnInit() {
    let queryString = `?skip=${this.skip}&limit=${this.limit}`;
    this.store.dispatch(new shopActions.FetchProductsInit(queryString));
    this.getState$ = this.store.pipe(select('shop'));
    this.getStateSubscription = this.getState$.subscribe((state) => {
      this.products = state.products;
      this.totalAmount = state.totalAmount;
    });
  }

  loadMore() {
    this.skip += this.limit;
    let queryString = `?skip=${this.skip}&limit=${this.limit}`;
    this.store.dispatch(new shopActions.FetchProducts(queryString));
  }

  ngOnDestroy(){
    this.getStateSubscription.unsubscribe();
  }

}
