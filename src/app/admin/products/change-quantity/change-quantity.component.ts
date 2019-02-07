import { Component, OnInit, OnDestroy} from '@angular/core';
import * as productsActions from "../../../shop/store/actions/products.actions";
import {ActivatedRoute} from "@angular/router";
import {select, Store} from "@ngrx/store";
import * as fromRoot from "../../../shop/store/reducers/reducer.factory";
import {untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";

@Component({
  selector: 'app-change-quantity',
  templateUrl: './change-quantity.component.html',
  styleUrls: ['./change-quantity.component.scss']
})
export class ChangeQuantityComponent implements OnInit, OnDestroy {
  sizesQuantity: any[];
  constructor(private store: Store<fromRoot.AppState>, private route:ActivatedRoute) { }

  ngOnInit() {
     this.store.dispatch(new productsActions.FetchSizesQuantity(+this.route.snapshot.params['product_id'])
     this.store.pipe(select(fromRoot.getProducts)).pipe(
      untilComponentDestroyed(this)
    ).subscribe((state) => {
      this.sizesQuantity = state.sizesQuantity;
    });
  }

  ngOnDestroy() {}

}
