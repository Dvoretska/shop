import { Component, OnInit, Input } from '@angular/core';
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-wishlist-item',
  templateUrl: './wishlist-item.component.html',
  styleUrls: ['./wishlist-item.component.scss']
})
export class WishlistItemComponent implements OnInit {
  @Input() wishlistItem;
  imagePath: string;

  constructor() { }

  ngOnInit() {
    this.imagePath = `${environment.API_URL}/${this.wishlistItem.images[0]}`;
  }

  deleteProductFromWishlist() {

  }

}
