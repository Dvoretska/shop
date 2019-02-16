import { Component, OnInit, OnDestroy } from '@angular/core';
import * as orderActions from "../../store/actions/order.actions";
import {ActivatedRoute} from "@angular/router";
import {select, Store} from "@ngrx/store";
import * as fromRoot from "../../store/reducers/reducer.factory";
import {untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-checkout',
  templateUrl: './current-order.component.html',
  styleUrls: ['./current-order.component.scss']
})
export class CurrentOrderComponent implements OnInit, OnDestroy {
  orderInfo: string;
  orderPerson: any;
  orders: any;
  email:string = '';
  fetchOrderLoading: boolean;
  showDetails: boolean = false;

  constructor(private route: ActivatedRoute, private store: Store<fromRoot.AppState>) { }

  ngOnInit() {
    this.route.snapshot.queryParamMap.get('showDetails') === 'true' ? this.showDetails = true : this.showDetails = false;
    this.store.dispatch(new orderActions.FetchOrder({order_number: +this.route.snapshot.params.order_number}));
    this.store.pipe(select(fromRoot.getOrder)).pipe(
      untilComponentDestroyed(this)
    ).subscribe((state) => {
      this.fetchOrderLoading = state.fetchOrderLoading;
      if(state.orderInfo) {
        this.orderInfo = state.orderInfo;
        this.orderPerson = state.orderPerson;
        this.orders = state.order;
      }
    });
  }

  downloadPdf() {
    let data = document.getElementById('checkout');
    html2canvas(data).then(canvas => {
      let imgWidth = 200;
      let imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jspdf('p', 'mm', 'a4');
      pdf.addImage(contentDataURL, 'PNG', 5, 5, imgWidth, imgHeight);
      pdf.save(`Order${Date.now()}.pdf`);
    });
  }

  ngOnDestroy() {}

}
