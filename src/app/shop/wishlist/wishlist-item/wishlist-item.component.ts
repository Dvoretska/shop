import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {select, Store} from "@ngrx/store";
import * as fromRoot from "../../store/reducers/reducer.factory";
import * as wishlistActions from "../../store/actions/wishlist.actions";
import {Router} from "@angular/router";
import * as cartActions from "../../store/actions/cart.actions";
import {untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";
import {CartModalComponent} from "../../cart/cart-modal/cart-modal.component";
import {BsModalService} from "ngx-bootstrap/modal";
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-wishlist-item',
  templateUrl: './wishlist-item.component.html',
  styleUrls: ['./wishlist-item.component.scss']
})
export class WishlistItemComponent implements OnInit, OnDestroy {
  @Input() wishlistItem;
  @Input() sizes: string[];
  @Input() addToCartWasClicked: boolean;
  isAddedToCart:  boolean;
  modalRef: BsModalRef;
  imagePath: string;
  selectedSize: string;
  productQuantity: number;
  selectedProduct;
  constructor(private store: Store<fromRoot.AppState>, private router: Router, private modalService: BsModalService) { }

  ngOnInit() {
    this.store.pipe(select(fromRoot.getCart)).pipe(
      untilComponentDestroyed(this)
    ).subscribe((state) => {
      this.isAddedToCart = state.isAddedToCart;
      this.productQuantity = state.productQty;
      if(this.isAddedToCart && this.selectedProduct) {
        this.addToCartWasClicked = false;
        const initialState = {currentProduct: this.selectedProduct, size: this.selectedSize, quantity: this.productQuantity};
        this.modalRef = this.modalService.show(CartModalComponent, { class : 'cart-modal', initialState });
        this.selectedSize = null;
        this.selectedProduct = null;
      }
    });
    this.imagePath = `${environment.API_URL}/${this.wishlistItem.images[0]}`;
  }

  deleteProductFromWishlist() {
    this.store.dispatch(new wishlistActions.DeleteProductFromWishlist({
      id: this.wishlistItem['id']
    }));
  }

  addProductToCart() {
    this.addToCartWasClicked = true;
    this.selectedProduct = this.wishlistItem;
    if(this.selectedSize) {
      this.store.dispatch(new cartActions.AddProductToCart({
        size: this.selectedSize, quantity: 1, product_id: this.wishlistItem['product_id']
      }));
    }
  }

  openProductDetails() {
    this.router.navigate(['shop', this.wishlistItem.product_id]);
  }

  ngOnDestroy() {}
}
