import { Component, OnInit } from '@angular/core';
import * as orderActions from "../store/actions/order.actions";
import {ActivatedRoute} from "@angular/router";
import {Store} from "@ngrx/store";
import * as fromRoot from "../store/reducers/reducer.factory";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  constructor(private route: ActivatedRoute, private store: Store<fromRoot.AppState>) { }

  ngOnInit() {
    this.route.params
      .subscribe((params) => {
        this.store.dispatch(new orderActions.FetchOrder({order_number: +params['order_number']}));
      });
  }

}
