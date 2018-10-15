import { Component, OnInit } from '@angular/core';
import {Store, select} from "@ngrx/store";
import * as fromRoot from "../store/shop.reducer";
import {Observable, Subscription} from "rxjs";
import * as shopActions from "../store/shop.actions";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: any[];
  getState$: Observable<fromRoot.ShopState>;
  private getStateSubscription: Subscription;

  constructor(private store: Store<fromRoot.ShopState>) {
    this.getState$ = this.store.pipe(select('shop'));
  }

  ngOnInit() {
    this.store.dispatch(new shopActions.FetchProducts());
    this.getStateSubscription = this.getState$.subscribe((state) => {
      this.products = state.products;
    });
  }

}
