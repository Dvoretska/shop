import { Component, OnInit, Input } from '@angular/core';
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
  @Input() cartItem;
  imagePath: string;

  constructor() { }

  ngOnInit() {
    this.imagePath = `${environment.API_URL}/${this.cartItem.images[0]}`;
  }

}
