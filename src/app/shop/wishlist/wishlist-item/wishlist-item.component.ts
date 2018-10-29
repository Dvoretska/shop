import { Component, OnInit, Input } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../store/reducers/reducer.factory";
import * as WishlistActions from "../../store/actions/wishlist.actions";

@Component({
  selector: 'app-wishlist-item',
  templateUrl: './wishlist-item.component.html',
  styleUrls: ['./wishlist-item.component.scss']
})
export class WishlistItemComponent implements OnInit {
  @Input() wishlistItem;
  imagePath: string;

  constructor(private store: Store<fromRoot.AppState>) { }

  ngOnInit() {
    this.imagePath = `${environment.API_URL}/${this.wishlistItem.images[0]}`;
  }

  deleteProductFromWishlist() {
    this.store.dispatch(new WishlistActions.DeleteProductFromWishlist({
      id: this.wishlistItem['id']
    }));
  }

  addProductToCart() {

  }

}
