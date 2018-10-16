import { Component, OnInit, OnDestroy } from '@angular/core';
import {Store, select} from "@ngrx/store";
import * as fromRoot from "../store/shop.reducer";
import {Observable, Subscription} from "rxjs";
import * as shopActions from "../store/shop.actions";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: any[];
  getState$: Observable<fromRoot.ShopState>;
  limit: number;
  skip: number;
  private getStateSubscription: Subscription;

  constructor(private route: ActivatedRoute, private store: Store<fromRoot.ShopState>, private router: Router) {
  }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        this.skip = params.skip | 0;
        this.limit = params.limit | 3;
        let queryString = `?skip=${this.skip}&limit=${this.limit}`;
        this.store.dispatch(new shopActions.FetchProducts(queryString));
      });
    this.getState$ = this.store.pipe(select('shop'));
    this.getStateSubscription = this.getState$.subscribe((state) => {
      this.products = state.products;
      console.log(state)
    });
  }

  loadMore() {
    this.skip += this.limit;
    this.router.navigate(['/shop/'], { queryParams: { skip: this.skip, limit: this.limit } });
    this.route
      .queryParams
      .subscribe(params => {
        let queryString = `?skip=${params.skip}&limit=${params.limit}`;
        this.store.dispatch(new shopActions.FetchProducts(queryString));
      });

  }

  ngOnDestroy(){
    this.getStateSubscription.unsubscribe();
  }

}
