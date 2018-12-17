import { Component, OnInit, OnDestroy, Inject, ViewChild, ViewContainerRef, ComponentFactoryResolver, AfterViewInit } from '@angular/core';
import {Store, select} from "@ngrx/store";
import { DOCUMENT } from '@angular/common';
import * as fromRoot from "../store/reducers/reducer.factory";
import * as productsActions from "../store/actions/products.actions";
import * as wishlistActions from "../store/actions/wishlist.actions";
import { PageScrollConfig, PageScrollService, PageScrollInstance } from 'ngx-page-scroll';
import {untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy, AfterViewInit {
  products: any[];
  limit: number = 3;
  skipProducts: number;
  skipSearchedProducts: number;
  totalAmount: number;
  initLoading: boolean;
  loading: boolean;
  targetId;
  error;
  wishlist: any[];
  categoriesTree: any[];
  fetchProductsBySearchLoading: boolean;
  @ViewChild('parent', { read: ViewContainerRef }) container: ViewContainerRef;

  constructor(private store: Store<fromRoot.AppState>,
              private pageScrollService: PageScrollService,
              @Inject(DOCUMENT) private document: any,
              private route: ActivatedRoute,
              private _cfr: ComponentFactoryResolver) {
    PageScrollConfig.defaultDuration = 1000;
  }

  ngOnInit() {
    this.store.dispatch(new productsActions.FetchCategoriesTree());
    this.store.pipe(select(fromRoot.getProducts)).pipe(
      untilComponentDestroyed(this)
    ).subscribe((state) => {
        this.products = state.products;
        this.totalAmount = state.totalAmount;
        this.initLoading = state.fetchProductsInitLoading;
        this.targetId = state.targetId;
        this.loading = state.fetchProductsLoading;
        this.categoriesTree = state.categoriesTree;
        this.fetchProductsBySearchLoading = state.fetchProductsBySearchLoading;
    });
    this.store.pipe(select(fromRoot.getWishlist)).pipe(
      untilComponentDestroyed(this)
    ).subscribe((state) => {
        this.wishlist = state.wishlist;
    });
    this.route.queryParams.subscribe(params => {
      if (this.targetId) {
        setTimeout(()=>{
          let pageScrollInstance: PageScrollInstance = PageScrollInstance.simpleInstance(this.document, '#item'+this.targetId);
          this.pageScrollService.start(pageScrollInstance);
          this.store.dispatch(new productsActions.RemoveTargetId());
        }, 0);
      } else if(params['search']){
        this.skipSearchedProducts = 0;
        let searchItem = params['search'];
        let queryString = `?skip=0&limit=${this.limit}&search=${searchItem}`;
        this.store.dispatch(new productsActions.FetchProductsBySearchInit(queryString));
      } else {
        this.skipProducts = 0;
        let subcategory = +params['subcategory'] || 1;
        let queryString = `?skip=0&limit=${this.limit}&subcategory=${subcategory}`;
        this.store.dispatch(new productsActions.FetchProductsInit(queryString));
      }
    });
  }

  ngAfterViewInit() {
    // if(!sessionStorage .getItem('adIsClosed')) {
    //   let comp = this._cfr.resolveComponentFactory(SaleComponent);
    //   let saleComponent = this.container.createComponent(comp);
    //   saleComponent.instance._ref = saleComponent;
    // }
  }

  loadMore() {
    let searchRoute = this.route.snapshot.queryParamMap.get('search');
    if(searchRoute) {
      this.skipSearchedProducts += this.limit;
      let queryString = `?skip=${this.skipSearchedProducts}&limit=${this.limit}&search=${searchRoute}`;
      this.store.dispatch(new productsActions.FetchProductsBySearch(queryString));
    } else {
      this.skipProducts += this.limit;
      let category =  this.route.snapshot.queryParamMap.get('category') || 1;
      let queryString = `?skip=${this.skipProducts}&limit=${this.limit}&category=${category}`;
      this.store.dispatch(new productsActions.FetchProducts(queryString));
    }
  }

  ngOnDestroy(){}

}
