import { Component, OnInit } from '@angular/core';
import * as categoriesActions from "../../../store/actions/categories.actions";
import {select, Store} from "@ngrx/store";
import * as fromRoot from "../../../store/reducers/reducer.factory";
import {untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";


@Component({
  selector: 'app-add-subcategory',
  templateUrl: './add-subcategory.component.html',
  styleUrls: ['./add-subcategory.component.scss']
})
export class AddSubcategoryComponent implements OnInit {
  selectedCategory: string;
  adSubcategory: string;
  categories: any;
  constructor(private store: Store<fromRoot.AppState>) { }

  ngOnInit() {
    this.store.dispatch(new categoriesActions.FetchCategories());
    this.store.pipe(select(fromRoot.getCategories)).pipe(
      untilComponentDestroyed(this)
    ).subscribe((state) => {
      this.categories = state.categories;
    });
  }

  onSaveAdSubcategory() {
    this.store.dispatch(new categoriesActions.SaveAdditionalSubcategory({category_id: this.selectedCategory, subcategory: this.adSubcategory}));
  }

  ngOnDestroy(){}

}
