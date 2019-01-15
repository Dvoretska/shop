import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as productsActions from '../../../shop/store/actions/products.actions';
import {ActivatedRoute, Params, Router} from "@angular/router";
import * as fromRoot from '../../../shop/store/reducers/reducer.factory';
import {untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.scss']
})
export class DeleteProductComponent implements OnInit, OnDestroy {
  product: any;
  productWasDeleted: boolean;
  constructor(private store: Store<fromRoot.AppState>,
              private route:ActivatedRoute,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit() {
     this.route.params.subscribe(
      (params: Params) => {
        this.store.dispatch(new productsActions.FetchProductDetails(+params['product_id']));
      }
    );
    this.store.pipe(select(fromRoot.getProducts)).pipe(
      untilComponentDestroyed(this)
    ).subscribe((state) => {
      this.product = state.product;
      this.productWasDeleted = state.productWasDeleted;
      if(this.productWasDeleted) {
        this.toastr.success('Product was deleted successfully!');
        this.router.navigate(['../..'], {relativeTo:this.route});
      }
    });
  }

  onDeleteItem() {
    this.store.dispatch(new productsActions.DeleteProduct({product_id: this.product.id}));
  }

  ngOnDestroy() {
    this.store.dispatch(new productsActions.RemoveProductWasDeleted());
  }

}
