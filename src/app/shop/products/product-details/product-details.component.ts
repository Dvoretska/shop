import { Component, OnInit, OnDestroy } from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Store, select} from "@ngrx/store";
import * as fromRoot from "../../store/shop.reducer";
import {ActivatedRoute} from "@angular/router";
import * as shopActions from "../../store/shop.actions";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  getState$: Observable<fromRoot.ShopState>;
  private getStateSubscription: Subscription;
  product;

  constructor(private route: ActivatedRoute, private store: Store<fromRoot.ShopState>) { }

  ngOnInit() {
    this.route.params
      .subscribe((params) => {
        this.store.dispatch(new shopActions.FetchProductDetails(+params['product_id']));
      });
    this.getState$ = this.store.pipe(select('shop'));
    this.getStateSubscription = this.getState$.subscribe((state) => {
      this.product = state.product;
    });
  }

  ngOnDestroy(){
    this.getStateSubscription.unsubscribe();
  }

}
