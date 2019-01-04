import { Component, OnInit, OnDestroy } from '@angular/core';
import * as productsActions from "../../../shop/store/actions/products.actions";
import {select, Store} from "@ngrx/store";
import * as fromRoot from "../../../shop/store/reducers/reducer.factory";
import {untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit,OnDestroy {
  page: number = 1;
  itemsPerPage: number = 2;
  products: any[];
  order:string = 'desc';
  totalAmount: number;
  constructor(private store: Store<fromRoot.AppState>,
              private router: Router, private route:ActivatedRoute) {
  }

  ngOnInit() {
    let queryString = `?skip=0&limit=${this.itemsPerPage}`;
    this.store.dispatch(new productsActions.FetchProductsInit(queryString));
    this.store.pipe(select(fromRoot.getProducts)).pipe(
      untilComponentDestroyed(this)
    ).subscribe((state) => {
      this.products = state.products;
      this.totalAmount = state.totalAmount;
    });
  }

  openProductDetails(id) {
    this.router.navigate([id], {relativeTo:this.route});
  }

  pageChanged(event) {
    this.page = event;
    let queryString = `?skip=${(this.itemsPerPage * this.page) - this.itemsPerPage}&limit=${this.itemsPerPage}`;
    this.store.dispatch(new productsActions.FetchProductsInit(queryString));
  }

  ngOnDestroy() {}

}
