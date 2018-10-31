import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import {Store, select} from "@ngrx/store";
import { DOCUMENT } from '@angular/common';
import * as fromRoot from "../store/reducers/reducer.factory";
import * as productsActions from "../store/actions/products.actions";
import * as wishlistActions from "../store/actions/wishlist.actions";
import { PageScrollConfig, PageScrollService, PageScrollInstance } from 'ngx-page-scroll';
import {untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: any[];
  limit: number = 3;
  skip: number;
  totalAmount: number;
  initLoading: boolean;
  loading: boolean;
  targetId;
  error;
  chunk: number;
  wishlist: any[];


  constructor(private store: Store<fromRoot.AppState>, private pageScrollService: PageScrollService, @Inject(DOCUMENT) private document: any) {
    PageScrollConfig.defaultDuration = 1000;
  }

  ngOnInit() {
    this.store.dispatch(new wishlistActions.FetchWishlist());
    this.store.pipe(select(fromRoot.getProducts)).pipe(
      untilComponentDestroyed(this)
    ).subscribe((state) => {
        this.products = state.products;
        this.totalAmount = state.totalAmount;
        this.initLoading = state.fetchProductsInitLoading;
        this.targetId = state.targetId;
        this.chunk = state.skip;
        this.loading = state.fetchProductsLoading;
    });
    this.store.pipe(select(fromRoot.getWishlist)).pipe(
      untilComponentDestroyed(this)
    ).subscribe((state) => {
        this.wishlist = state.wishlist;
    });
    this.skip = this.chunk;
    if (this.targetId) {
      setTimeout(()=>{
        let pageScrollInstance: PageScrollInstance = PageScrollInstance.simpleInstance(this.document, '#item'+this.targetId);
        this.pageScrollService.start(pageScrollInstance);
      }, 0);
    } else {
      this.skip = 0;
      let queryString = `?skip=${this.skip}&limit=${this.limit}`;
      this.store.dispatch(new productsActions.FetchProductsInit(queryString));
    }
  }

  loadMore() {
    this.skip += this.limit;
    let queryString = `?skip=${this.skip}&limit=${this.limit}`;
    this.store.dispatch(new productsActions.FetchProducts({queryString: queryString, skip: this.skip}));
  }

  ngOnDestroy(){}

}
