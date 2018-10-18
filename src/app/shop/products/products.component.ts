import { Component, OnInit, OnDestroy, Inject, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import {Store, select} from "@ngrx/store";
import { DOCUMENT } from '@angular/common';
import * as fromRoot from "../store/shop.reducer";
import {Observable, Subscription} from "rxjs";
import * as shopActions from "../store/shop.actions";
import { PageScrollConfig, PageScrollService, PageScrollInstance } from 'ngx-page-scroll';
import {untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";
import { take, map, tap} from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy, AfterViewChecked {
  products: any[];
  getState$: Observable<fromRoot.ShopState>;
  limit: number = 3;
  skip: number = 0;
  totalAmount: number;
  initLoading: boolean;
  loading: boolean;
  targetId;
  error;
  @ViewChild('container')
  private container: ElementRef;

  constructor(private store: Store<fromRoot.ShopState>, private pageScrollService: PageScrollService, @Inject(DOCUMENT) private document: any) {
    PageScrollConfig.defaultDuration = 700;
  }

  ngOnInit() {

    this.getState$ = this.store.pipe(select('shop'));
    this.getState$.pipe(
      untilComponentDestroyed(this), take(1)
    ).subscribe((state) => {
        this.products = state.products;
        this.totalAmount = state.totalAmount;
        this.initLoading = state.fetchProductsInitLoading;
        this.targetId = state.targetId;
        if(this.targetId) {
          return;
        } else {
          let queryString = `?skip=${this.skip}&limit=${this.limit}`;
          this.store.dispatch(new shopActions.FetchProductsInit(queryString));
        }


    })
    console.log(this.products)
    // this.store
    //   .pipe(
    //     select('shop'),
    //     take(2)
    //   )
    //   .subscribe(state => {
    //     console.log('state')
    //     if(state.targetId) {
    //       this.products = state.products;
    //       this.totalAmount = state.totalAmount;
    //       this.initLoading = state.fetchProductsInitLoading;
    //       this.error = state.error
    //       console.log('1', state)
    //     } else {
    //       console.log('3', state)
    //       let queryString = `?skip=${this.skip}&limit=${this.limit}`;
    //       this.store.dispatch(new shopActions.FetchProductsInit(queryString));
    //       console.log('2', state)
    //     }
    //   });
  }

  ngAfterViewChecked() {
    // let pageScrollInstance: PageScrollInstance = PageScrollInstance.newInstance({document: this.document, scrollTarget: '#item172'});
    // this.pageScrollService.start(pageScrollInstance);
  }

  loadMore() {
    this.skip += this.limit;
    let queryString = `?skip=${this.skip}&limit=${this.limit}`;
    this.store.dispatch(new shopActions.FetchProducts(queryString));
    this.getState$.pipe(
      untilComponentDestroyed(this)
    ).subscribe((state) => {
      this.loading = state.fetchProductsLoading;
    });
  }

  ngOnDestroy(){}

}
