import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import * as productsActions from "../../../shop/store/actions/products.actions";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../../shop/store/reducers/reducer.factory";

@Component({
  selector: 'app-add-size',
  templateUrl: './add-size.component.html',
  styleUrls: ['./add-size.component.scss']
})
export class AddSizeComponent implements OnInit {
  size: string = '';
  constructor(private toastr: ToastrService, private store: Store<fromRoot.AppState>) { }

  ngOnInit() {
  }

  onSave() {
    this.store.dispatch(new productsActions.AddSize({
      size: this.size,
      showToast: this.toastr,
      clearFields: () => {this.size = ''}
    }));
  }

}
