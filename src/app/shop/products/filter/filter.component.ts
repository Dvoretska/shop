import { Component, OnInit, Input } from '@angular/core';
import * as productsActions from "../../store/actions/products.actions";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../store/reducers/reducer.factory";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Input() categories: any[];
  searchValue: string = '';
  constructor(private store: Store<fromRoot.AppState>) { }

  ngOnInit() {
  }

  searchProduct(){
    // this.store.dispatch(new productsActions.FetchProductsInit(`?search=${this.searchValue}`));
  }

}
