import { Component, OnInit } from '@angular/core';
import * as categoriesActions from "../../store/actions/categories.actions";
import {select, Store} from "@ngrx/store";
import * as fromRoot from "../../store/reducers/reducer.factory";
import {untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";
import {TreeviewItem} from 'ngx-treeview';
import * as productsActions from "../../store/actions/products.actions";

@Component({
  selector: 'app-create-category',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categoriesTree: any[];
  nodes: any[];
  selectedSubcategories: number[];
  config = {
    hasAllCheckBox: false
  };
  category: string = '';
  constructor(private store: Store<fromRoot.AppState>) { }

  ngOnInit() {
    this.store.dispatch(new categoriesActions.FetchCategoriesTree());
    this.store.pipe(select(fromRoot.getCategories)).pipe(
      untilComponentDestroyed(this)
    ).subscribe((state) => {
      this.categoriesTree = state.categoriesTree;
      this.nodes = this.categoriesTree.map((item) => new TreeviewItem(item))
    });
  }

  onSelectedChange(event) {
    this.selectedSubcategories = event;
    console.log(this.selectedSubcategories)
  }

  onSaveCategory() {
    this.store.dispatch(new categoriesActions.AddCategory({category: this.category}));
  }

  ngOnDestroy(){}

}
