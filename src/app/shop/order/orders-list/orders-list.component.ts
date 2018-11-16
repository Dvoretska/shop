import { Component, OnInit, OnDestroy } from '@angular/core';
import * as orderActions from "../../store/actions/order.actions";
import {select, Store} from "@ngrx/store";
import * as fromRoot from "../../store/reducers/reducer.factory";
import {untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";

@Component({
  selector: 'app-order',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit, OnDestroy {
  orders;
  constructor(private store: Store<fromRoot.AppState>) { }

  ngOnInit() {
    this.store.dispatch(new orderActions.FetchOrders());
    this.store.pipe(select(fromRoot.getOrder)).pipe(
      untilComponentDestroyed(this)
    ).subscribe((state) => {
      this.orders = state.orders;
    });
  }

  ngOnDestroy() {}

}
