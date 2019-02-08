import { Component, OnInit, Input } from '@angular/core';
import * as productsActions from "../../../shop/store/actions/products.actions";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../../shop/store/reducers/reducer.factory";

@Component({
  selector: 'app-sizes-actions',
  templateUrl: './sizes-actions.component.html',
  styleUrls: ['./sizes-actions.component.scss']
})
export class SizesActionsComponent implements OnInit {
  @Input() checkedSizes: number[];
  constructor(private store: Store<fromRoot.AppState>) { }

  ngOnInit() {
  }

  onDeleteSizes() {
    this.store.dispatch(new productsActions.DeleteSizes({
      sizes: this.checkedSizes.join(',')
    }))
  }

}
