import { Component, OnInit, OnDestroy, Inject, ViewChild, ElementRef } from '@angular/core';
import {Store, select} from "@ngrx/store";
import { DOCUMENT } from '@angular/common';
import * as fromRoot from "../store/shop.reducer";
import {Observable} from "rxjs";
import * as shopActions from "../store/shop.actions";
import { PageScrollConfig, PageScrollService, PageScrollInstance } from 'ngx-page-scroll';
import {untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: any[];
  getState$: Observable<fromRoot.ShopState>;
  limit: number = 3;
  skip: number;
  totalAmount: number;
  initLoading: boolean;
  loading: boolean;
  targetId;
  error;
  chunk: number;
  @ViewChild('container')
  private container: ElementRef;

  constructor(private store: Store<fromRoot.ShopState>, private pageScrollService: PageScrollService, @Inject(DOCUMENT) private document: any) {
    PageScrollConfig.defaultDuration = 1000;
  }

  ngOnInit() {
    this.getState$ = this.store.pipe(select('shop'));
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
      let queryString = `?skip=${this.skip}&limit=${this.limit}`;
      this.store.dispatch(new shopActions.FetchProductsInit(queryString));
    }
  }

  loadMore() {
    this.skip += this.limit;
    let queryString = `?skip=${this.skip}&limit=${this.limit}`;
    this.store.dispatch(new shopActions.FetchProducts({queryString: queryString, skip: this.skip}));
    this.getState$.pipe(
      untilComponentDestroyed(this)
    ).subscribe((state) => {
      this.loading = state.fetchProductsLoading;
    });
  }

  ngOnDestroy(){}

}
