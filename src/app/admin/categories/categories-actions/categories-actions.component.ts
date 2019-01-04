import { Component, OnInit, Input } from '@angular/core';
import * as categoriesActions from "../../../shop/store/actions/categories.actions";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../../shop/store/reducers/reducer.factory";

@Component({
  selector: 'app-categories-actions',
  templateUrl: './categories-actions.component.html',
  styleUrls: ['./categories-actions.component.scss']
})
export class CategoriesActionsComponent implements OnInit {
  @Input() selectedSubcategories: number[];
  constructor(private store: Store<fromRoot.AppState>) { }

  ngOnInit() {
  }

  onDeleteSubcategories() {
    this.store.dispatch(new categoriesActions.DeleteSubcategories({subcategories: this.selectedSubcategories.join()}));
  }

}
