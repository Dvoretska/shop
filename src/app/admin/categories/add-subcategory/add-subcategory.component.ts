import { Component, OnInit } from '@angular/core';
import * as categoriesActions from "../../../shop/store/actions/categories.actions";
import {select, Store} from "@ngrx/store";
import * as fromRoot from "../../../shop/store/reducers/reducer.factory";
import {untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-add-subcategory',
  templateUrl: './add-subcategory.component.html',
  styleUrls: ['./add-subcategory.component.scss']
})
export class AddSubcategoryComponent implements OnInit {
  selectedCategory: string;
  adSubcategory: string = '';
  categories: any;
  subcategoryWasAdded: boolean;
  constructor(private store: Store<fromRoot.AppState>, private toastr: ToastrService) { }

  ngOnInit() {
    this.store.dispatch(new categoriesActions.FetchCategories());
    this.store.pipe(select(fromRoot.getCategories)).pipe(
      untilComponentDestroyed(this)
    ).subscribe((state) => {
      this.categories = state.categories;
      this.subcategoryWasAdded = state.subcategoryWasAdded;
      if(this.subcategoryWasAdded) {
        this.toastr.success('Subcategory was saved successfully!');
        this.adSubcategory = '';
      }
    });
  }

  onSaveAdSubcategory() {
    this.store.dispatch(new categoriesActions.SaveAdditionalSubcategory({category_id: this.selectedCategory, subcategory: this.adSubcategory}));
  }

  ngOnDestroy(){
    this.store.dispatch(new categoriesActions.RemoveSubcategoryWasAdded());
  }

}
