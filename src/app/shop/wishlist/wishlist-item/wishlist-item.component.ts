import { Component, OnInit, Input, OnDestroy, TemplateRef, OnChanges, SimpleChanges } from '@angular/core';
import {select, Store} from "@ngrx/store";
import * as fromRoot from "../../store/reducers/reducer.factory";
import * as wishlistActions from "../../store/actions/wishlist.actions";
import * as productsActions from "../../store/actions/products.actions";
import {Router} from "@angular/router";
import * as cartActions from "../../store/actions/cart.actions";
import {untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";
import {CartModalComponent} from "../../cart/cart-modal/cart-modal.component";
import {BsModalService} from "ngx-bootstrap/modal";
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-wishlist-item',
  templateUrl: './wishlist-item.component.html',
  styleUrls: ['./wishlist-item.component.scss']
})
export class WishlistItemComponent implements OnInit, OnDestroy, OnChanges {
  @Input() wishlistItem;
  @Input() addToCartWasClicked: boolean;
  @Input() availableSizes: any[];
  @Input() message: string;
  isAddedToCart:  boolean;
  modalRef: BsModalRef;
  imagePath: string;
  selectedSize: any;
  productQuantity: number;
  selectedProduct;
  defaultImageUrl: string = '/assets/no-img.jpg';
  constructor(private store: Store<fromRoot.AppState>,
              private router: Router,
              private toastr: ToastrService,
              private modalService: BsModalService) { }

  ngOnInit() {
    this.store.pipe(select(fromRoot.getCart)).pipe(
      untilComponentDestroyed(this)
    ).subscribe((state) => {
      this.isAddedToCart = state.isAddedToCart;
      this.productQuantity = state.productQty;
      console.log(this.selectedProduct)
      if(this.isAddedToCart && this.selectedProduct && this.selectedSize) {
        this.addToCartWasClicked = false;
        const initialState = {currentProduct: this.selectedProduct, size: this.selectedSize['label'], quantity: this.productQuantity};
        this.modalRef = this.modalService.show(CartModalComponent, { class : 'cart-modal', initialState });
        this.selectedSize = null;
        this.selectedProduct = null;
      }
    });
    this.wishlistItem.images &&  this.wishlistItem.images.length ? this.imagePath = this.wishlistItem.images[0] : this.imagePath = this.defaultImageUrl;
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['message'] && changes['message'].currentValue) {
      setTimeout(() => {
        this.toastr.info(`${this.message}`);
      }, 0);
    }
  }

  chooseSize() {
    this.store.dispatch(new productsActions.GetAvailableSizes(this.wishlistItem['product_id']));
  }

  addToCart() {
    if(this.selectedSize && this.selectedSize['value']) {
     this.store.dispatch(new cartActions.AddProductToCart({
        size_id: this.selectedSize['value'], quantity: 1, product_id: this.wishlistItem['product_id']
     }));
    }
  }

  deleteProductFromWishlist() {
    this.store.dispatch(new wishlistActions.DeleteProductFromWishlist({
      product_id: this.wishlistItem['product_id']
    }));
  }

  openSelect() {
    this.addToCartWasClicked = true;
    this.selectedProduct = this.wishlistItem;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.deleteProductFromWishlist();
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }

  openProductDetails() {
    this.router.navigate(['shop/products', this.wishlistItem.product_id]);
  }

  ngOnDestroy() {
    this.store.dispatch(new cartActions.RemoveIsAddedToCart());
  }
}
