import { Component, OnInit } from '@angular/core';
import * as categoriesActions from "../../../shop/store/actions/categories.actions";
import {select, Store} from "@ngrx/store";
import * as fromRoot from "../../../shop/store/reducers/reducer.factory";
import {untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  category: string = '';
  subcategory: string = '';
  categoryWasAdded: boolean = false;
  constructor(private store: Store<fromRoot.AppState>, private toastr: ToastrService) { }

  ngOnInit() {
    this.store.pipe(select(fromRoot.getCategories)).pipe(
      untilComponentDestroyed(this)
    ).subscribe((state) => {
      this.categoryWasAdded = state.categoryWasAdded;
      if(this.categoryWasAdded) {
        this.toastr.success('Category was saved successfully!');
        this.category = '';
        this.subcategory = '';
      }
    });
  }

  onSaveCategory() {
    this.store.dispatch(new categoriesActions.AddCategory({category: this.category, subcategory: this.subcategory}));
  }

  ngOnDestroy(){
    this.store.dispatch(new categoriesActions.RemoveCategoryWasAdded());
  }
}
