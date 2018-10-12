import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromRoot from "../store/shop.reducer";
import {Observable, Subscription} from "rxjs";
import * as shopActions from "../store/shop.actions";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  getState$: Observable<fromRoot.ShopState>;
  private getStateSubscription: Subscription;

  constructor(private store: Store<fromRoot.ShopState>,) { }

  ngOnInit() {
    // this.store.dispatch(new shopActions.FetchProducts());
  }

}
