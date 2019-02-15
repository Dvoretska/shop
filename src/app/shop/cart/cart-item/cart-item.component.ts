import { Component, OnInit, Input, SimpleChanges, OnChanges, TemplateRef } from '@angular/core';
import * as cartActions from "../../store/actions/cart.actions";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../store/reducers/reducer.factory";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {BsModalService} from "ngx-bootstrap/modal";
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit, OnChanges {
  @Input() cartItem;
  @Input() totalNumberOfProducts;
  @Input() isAddedToCart;
  @Input() message;
  imagePath: string;
  modalRef: BsModalRef;

  constructor(private store: Store<fromRoot.AppState>,
              private router: Router,
              private toastr: ToastrService,
              private modalService: BsModalService) { }

  ngOnInit() {
    this.imagePath = this.cartItem.images[0];
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['message'] && changes['message'].currentValue) {
      setTimeout(() => {
        this.toastr.info(`${this.message}`);
      }, 0);
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.deleteProductFromCart();
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }

  increaseProductsQuantity() {
    this.store.dispatch(new cartActions.AddProductToCart({
      size_id: this.cartItem['size_id'], quantity: 1, product_id: this.cartItem['product_id']
    }));
  }

  decreaseProductsQuantity() {
    this.store.dispatch(new cartActions.DecreaseQuantityOfProductInCart({
      product_id: this.cartItem['product_id'], size_id: this.cartItem['size_id']
    }));
  }

  deleteProductFromCart() {
    this.store.dispatch(new cartActions.DeleteProductFromCart({
      id: this.cartItem['id']
    }));
  }

  openProductDetails() {
    this.router.navigate(['shop/products', this.cartItem['product_id']]);
  }
}
