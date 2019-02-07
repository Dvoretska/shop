import { Component, OnInit, OnDestroy} from '@angular/core';
import * as productsActions from "../../../shop/store/actions/products.actions";
import {ActivatedRoute} from "@angular/router";
import {select, Store} from "@ngrx/store";
import * as fromRoot from "../../../shop/store/reducers/reducer.factory";
import {untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-change-quantity',
  templateUrl: './change-quantity.component.html',
  styleUrls: ['./change-quantity.component.scss']
})
export class ChangeQuantityComponent implements OnInit, OnDestroy {
  sizesQuantity: any[];
  constructor(private toastr: ToastrService, private store: Store<fromRoot.AppState>, private route:ActivatedRoute) { }

  ngOnInit() {
     this.store.dispatch(new productsActions.FetchSizesQuantity(+this.route.snapshot.params['product_id']));
     this.store.pipe(select(fromRoot.getProducts)).pipe(
      untilComponentDestroyed(this)
    ).subscribe((state) => {
      this.sizesQuantity = state.sizesQuantity;
    });
  }

  onSubmit() {
    let savedData:FormData = new FormData();
    savedData.append('product_id', +this.route.snapshot.params['product_id']);
    let dataArr = [];
    for(let i = 0; i < this.sizesQuantity.length; i++) {
      dataArr.push({size_id: this.sizesQuantity[i].size_id, quantity: this.sizesQuantity[i].quantity});
    }
    savedData.append('dataArr', JSON.stringify(dataArr));
    this.store.dispatch(new productsActions.UpdateSizesQuantity(
      {savedData, callback: this.toastr}
    ))
  }

  ngOnDestroy() {}

}
