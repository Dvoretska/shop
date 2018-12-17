import { Component, OnInit } from '@angular/core';
import * as productsActions from "../../store/actions/products.actions";
import {select, Store} from "@ngrx/store";
import * as fromRoot from "../../store/reducers/reducer.factory";
import {untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";
import {TreeviewItem} from 'ngx-treeview';

@Component({
  selector: 'app-create-category',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categoriesTree: any[];
  nodes;
  constructor(private store: Store<fromRoot.AppState>) { }

  ngOnInit() {
    this.store.dispatch(new productsActions.FetchCategoriesTree());
    this.store.pipe(select(fromRoot.getProducts)).pipe(
      untilComponentDestroyed(this)
    ).subscribe((state) => {
      this.categoriesTree = state.categoriesTree;
      this.nodes = this.categoriesTree.map((item) => new TreeviewItem(item))
    });
  }

  onSelectedChange(event) {
    console.log(event);
  }

  ngOnDestroy(){}

}
