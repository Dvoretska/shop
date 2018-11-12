import { Component, OnInit, OnDestroy, Inject, ViewChild, ViewContainerRef, ComponentFactoryResolver, AfterViewInit } from '@angular/core';
import {Store, select} from "@ngrx/store";
import { DOCUMENT } from '@angular/common';
import * as fromRoot from "../store/reducers/reducer.factory";
import * as productsActions from "../store/actions/products.actions";
import * as wishlistActions from "../store/actions/wishlist.actions";
import { PageScrollConfig, PageScrollService, PageScrollInstance } from 'ngx-page-scroll';
import {untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";
import {ActivatedRoute} from "@angular/router";
import { SaleComponent } from '../../UI/sale/sale.component'


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy, AfterViewInit {
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
  categories: any[];
  @ViewChild('parent', { read: ViewContainerRef }) container: ViewContainerRef;

  constructor(private store: Store<fromRoot.AppState>,
              private pageScrollService: PageScrollService,
              @Inject(DOCUMENT) private document: any,
              private route: ActivatedRoute,
              private _cfr: ComponentFactoryResolver) {
    PageScrollConfig.defaultDuration = 1000;
  }

  ngOnInit() {

    this.store.dispatch(new productsActions.FetchCategories());
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
        this.categories = state.categories;
    });
    this.store.pipe(select(fromRoot.getWishlist)).pipe(
      untilComponentDestroyed(this)
    ).subscribe((state) => {
        this.wishlist = state.wishlist;
    });
    this.skip = this.chunk;
      this.route.queryParams.subscribe(params => {
        if (this.targetId) {
          setTimeout(()=>{
            let pageScrollInstance: PageScrollInstance = PageScrollInstance.simpleInstance(this.document, '#item'+this.targetId);
            this.pageScrollService.start(pageScrollInstance);
            this.store.dispatch(new productsActions.RemoveTargetId());
          }, 0);
        } else {
          this.skip = 0;
          let category = +params['category'] || 1;
          let queryString = `?skip=0&limit=${this.limit}&category=${category}`;
          this.store.dispatch(new productsActions.FetchProductsInit(queryString));
        }
      });
  }

  ngAfterViewInit() {
    if(!sessionStorage.getItem('adIsClosed')) {
      let comp = this._cfr.resolveComponentFactory(SaleComponent);
      let saleComponent = this.container.createComponent(comp);
      saleComponent.instance._ref = saleComponent;
    }
  }

  loadMore() {
      this.skip += this.limit;
      let category =  this.route.snapshot.queryParamMap.get('category') || 1;
      let queryString = `?skip=${this.skip}&limit=${this.limit}&category=${category}`;
      this.store.dispatch(new productsActions.FetchProducts({queryString: queryString, skip: this.skip}));
  }

  ngOnDestroy(){}

}
