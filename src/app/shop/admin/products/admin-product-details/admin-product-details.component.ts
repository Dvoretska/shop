import { Component, OnInit, OnDestroy } from '@angular/core';
import * as productsActions from "../../../store/actions/products.actions";
import {ActivatedRoute} from "@angular/router";
import {select, Store} from "@ngrx/store";
import * as fromRoot from "../../../store/reducers/reducer.factory";
import {untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";

@Component({
  selector: 'app-admin-product-details',
  templateUrl: './admin-product-details.component.html',
  styleUrls: ['./admin-product-details.component.scss']
})
export class AdminProductDetailsComponent implements OnInit, OnDestroy {
  product: any;
  constructor(private store: Store<fromRoot.AppState>, private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe((params) => {
        this.store.dispatch(new productsActions.FetchProductDetails(+params['product_id']));
      });
    this.store.pipe(select(fromRoot.getProducts)).pipe(
      untilComponentDestroyed(this)
    ).subscribe((state) => {
      this.product = state.product;
      console.log(this.product)
    });
  }

  ngOnDestroy() {}

}
