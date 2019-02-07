import { Component, OnInit, OnDestroy } from '@angular/core';
import * as productsActions from "../../../shop/store/actions/products.actions";
import {select, Store} from "@ngrx/store";
import * as fromRoot from "../../../shop/store/reducers/reducer.factory";
import {untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-add-quantity',
  templateUrl: './add-quantity.component.html',
  styleUrls: ['./add-quantity.component.scss']
})
export class AddQuantityComponent implements OnInit, OnDestroy {
  quantity:number = 0;
  sizes: string[];
  selectedSize: string;
  constructor(private toastr: ToastrService, private store: Store<fromRoot.AppState>, private route:ActivatedRoute) { }

  ngOnInit() {
    this.store.dispatch(new productsActions.GetSizes());
     this.store.pipe(select(fromRoot.getProducts)).pipe(
      untilComponentDestroyed(this)
    ).subscribe((state) => {
      this.sizes = state.sizes;
    });
  }

  onSave() {
    this.store.dispatch(new productsActions.AddQuantityToStock({
      size_id: this.selectedSize,
      product_id: +this.route.snapshot.params['product_id'],
      quantity: this.quantity,
      showToast: this.toastr
    }));
     this.quantity = 0;
     this.selectedSize = null;
  }

  ngOnDestroy() {}

}
