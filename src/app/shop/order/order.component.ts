import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  phone: string  = '';
  city: string  = '';
  name: string  = '';
  email: string  = '';
  comment: string  = '';

  constructor() { }

  ngOnInit() {
  }

}
