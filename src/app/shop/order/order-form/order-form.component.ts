import {Component, OnInit, ElementRef, ViewChild, Inject, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OrderForm} from '../../models/orderForm.model';
import { PageScrollConfig, PageScrollService, PageScrollInstance } from 'ngx-page-scroll';
import {DOCUMENT} from "@angular/common";
import * as orderActions from "../../store/actions/order.actions";
import {select, Store} from "@ngrx/store";
import * as fromRoot from "../../store/reducers/reducer.factory";
import {untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";


@Component({
  selector: 'app-order',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})

export class OrderFormComponent implements OnInit,OnDestroy {
  orderForm: OrderForm = {
    phone: '',
    city: '',
    first_name: '',
    surname: '',
    email: '',
    comment: '',
    post_code:  '',
    country: ''
  };
  order_number: number;

  @ViewChild('productForm') productForm:ElementRef;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private pageScrollService: PageScrollService,
              @Inject(DOCUMENT) private document: any,
              private store: Store<fromRoot.AppState>) {
    PageScrollConfig.defaultDuration = 1500;
  }

  ngOnInit() {
    this.orderForm.email = JSON.parse(localStorage.getItem('user')).email;
    let pageScrollInstance: PageScrollInstance = PageScrollInstance.simpleInstance(this.document, '#formContainer');
    this.pageScrollService.start(pageScrollInstance);
  }

  saveOrder() {
    let savedData:FormData = new FormData();
    for(let key in this.orderForm){
      savedData.append(key, this.orderForm[key]);
    }
    this.store.dispatch(new orderActions.SaveOrder({savedData}));
    this.store.pipe(select(fromRoot.getOrder)).pipe(
      untilComponentDestroyed(this)
    ).subscribe((state) => {
      this.order_number = state.order_number;
      if(this.order_number) {
        this.router.navigate(['../../current-order', this.order_number], {relativeTo: this.route});
      }
    });
  }

  ngOnDestroy() {}
}
