import { Component, OnInit, OnDestroy } from '@angular/core';
import * as productsActions from "../../../shop/store/actions/products.actions";
import {ActivatedRoute} from "@angular/router";
import {select, Store} from "@ngrx/store";
import * as fromRoot from "../../../shop/store/reducers/reducer.factory";
import {untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";

@Component({
  selector: 'app-sizes-list',
  templateUrl: './sizes-list.component.html',
  styleUrls: ['./sizes-list.component.scss']
})
export class SizesListComponent implements OnInit, OnDestroy {
  sizes: string[];
  checkedSizes: number[] = [];
  constructor(private store: Store<fromRoot.AppState>) { }

  ngOnInit() {
    this.store.dispatch(new productsActions.GetSizes())
     this.store.pipe(select(fromRoot.getProducts)).pipe(
      untilComponentDestroyed(this)
    ).subscribe((state) => {
      this.sizes = state.sizes;
    });
  }

  onSelect(event, id) {
    if ( event.target.checked ) {
      this.checkedSizes.push(id);
    }
  }

  ngOnDestroy() {}

}
