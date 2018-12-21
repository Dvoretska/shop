import { Component, OnInit } from '@angular/core';
import * as categoriesActions from "../../../store/actions/categories.actions";
import {select, Store} from "@ngrx/store";
import * as fromRoot from "../../../store/reducers/reducer.factory";
import {untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";
import {TreeviewItem} from 'ngx-treeview';
import { skip} from 'rxjs/operators';

@Component({
  selector: 'app-create-category',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {
  categoriesTree: any[];
  nodes: any[];
  selectedSubcategories: number[] = [];
  config = {
    hasAllCheckBox: false
  };

  constructor(private store: Store<fromRoot.AppState>) { }

  ngOnInit() {
    this.store.dispatch(new categoriesActions.FetchCategoriesTree());
    this.store.pipe(select(fromRoot.getCategories), skip(1)).pipe(
      untilComponentDestroyed(this)
    ).subscribe((state) => {
      this.categoriesTree = state.categoriesTree;
      this.nodes = this.categoriesTree.map((item) => new TreeviewItem(item))
    });
  }

  onSelectedChange(event) {
    this.selectedSubcategories = event;
  }

  onDeleteSubcategories() {
    this.store.dispatch(new categoriesActions.DeleteSubcategories({subcategories: this.selectedSubcategories.join()}));
  }


  ngOnDestroy(){}

}
