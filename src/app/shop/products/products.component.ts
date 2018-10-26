import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import {Store, select} from "@ngrx/store";
import { DOCUMENT } from '@angular/common';
import * as fromProducts from "../store/reducers/products.reducer";
import * as fromRoot from "../store/reducers/reducer.factory";
import {Observable} from "rxjs";
import * as productsActions from "../store/actions/products.actions";
import { PageScrollConfig, PageScrollService, PageScrollInstance } from 'ngx-page-scroll';
import {untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: any[];
  getState$: Observable<fromProducts.ProductsState>;
  limit: number = 3;
  skip: number;
  totalAmount: number;
  initLoading: boolean;
  loading: boolean;
  targetId;
  error;
  chunk: number;

  constructor(private store: Store<fromProducts.ProductsState>, private pageScrollService: PageScrollService, @Inject(DOCUMENT) private document: any) {
    PageScrollConfig.defaultDuration = 1000;
  }

  ngOnInit() {
    this.getState$ = this.store.pipe(select(fromRoot.getProducts));
    this.getState$.pipe(
      untilComponentDestroyed(this)
    ).subscribe((state) => {
        this.products = state.products;
        this.totalAmount = state.totalAmount;
        this.initLoading = state.fetchProductsInitLoading;
        this.targetId = state.targetId;
        this.chunk = state.skip;
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
    this.getState$.pipe(
      untilComponentDestroyed(this)
    ).subscribe((state) => {
      this.loading = state.fetchProductsLoading;
    });
  }

  ngOnDestroy(){}

}
