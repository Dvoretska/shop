import { Component, OnInit,Input } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit {
  @Input() order;
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  formattedDate() {
    return new Date(this.order.created)['toDateString']();
  }

  openOrderDetails() {
    this.router.navigate(['../current-order', this.order.order_number], {relativeTo: this.route});
  }

}
