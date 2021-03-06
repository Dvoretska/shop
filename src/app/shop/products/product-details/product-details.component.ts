import { Component, OnInit, OnDestroy } from '@angular/core';
import {Store, select} from "@ngrx/store";
import * as fromRoot from "../../store/reducers/reducer.factory";
import {ActivatedRoute, Router} from "@angular/router";
import * as productsActions from "../../store/actions/products.actions";
import * as cartActions from "../../store/actions/cart.actions";
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation,NgxGalleryImageSize } from 'ngx-gallery';
import {CartModalComponent} from "../../cart/cart-modal/cart-modal.component";
import {BsModalService} from "ngx-bootstrap/modal";
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";
import {ToastrService} from "ngx-toastr";
import {Product} from '../../models/product.model';
import {skip} from 'rxjs/operators';
import * as wishlistActions from "../../store/actions/wishlist.actions";
import {AuthService} from '../../../auth/auth.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {;
  product: Product;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[] = [];
  availableSizes: any[];
  selectedSize: string;
  modalRef: BsModalRef;
  productDetailsLoading: boolean;
  products: Product[];
  addToCartLoading: boolean;
  isAddedToCart: boolean;
  totalNumberOfProducts: number;
  productQuantity;
  wishlist: any[] = [];
  message: string;
  productIsInWishlist: boolean = false;
  defaultImageUrl: string = '/assets/no-img.jpg';

  constructor(private toastr: ToastrService,
              private router: Router,
              private modalService: BsModalService,
              private route: ActivatedRoute,
              private store: Store<fromRoot.AppState>,
              private authService: AuthService) { }

  ngOnInit() {
    if(this.authService.isAuthenticated()) {
      this.store.dispatch(new wishlistActions.FetchWishlist());
    }
    this.galleryOptions = [
      {
        width: '100%',
        height: '600px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        imageSize: NgxGalleryImageSize.Cover
      },
      {
        breakpoint: 991,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      {
        breakpoint: 450,
        preview: false,
        height: '300px',
        imagePercent: 100,
        thumbnails: false,
        imageSize: NgxGalleryImageSize.Cover
      }
    ];
    this.route.params
      .subscribe((params) => {
        this.store.dispatch(new productsActions.FetchProductDetails(+params['product_id']));
      });
    this.store.pipe(select(fromRoot.getProducts)).pipe(
      untilComponentDestroyed(this)
    ).subscribe((state) => {
      this.products = state.products;
      this.product = state.product;
      this.productDetailsLoading = state.productDetailsLoading;
      this.availableSizes = state.availableSizes;
      if(this.product && this.product['images']) {
        this.galleryImages = [];
        for(let image of this.product['images']) {
          let settings = {};
          settings['small'] = image;
          settings['medium'] = image;
          settings['big'] = image;
          this.galleryImages.push(settings);
        }
      } else {
        this.galleryImages = [];
        let settings = {};
        settings['small'] = this.defaultImageUrl;
        settings['medium'] = this.defaultImageUrl;
        settings['big'] = this.defaultImageUrl;
        this.galleryImages.push(settings);
      }
    });
    this.store.pipe(select(fromRoot.getCart)).pipe(
      untilComponentDestroyed(this)
    ).subscribe((state) => {
      this.isAddedToCart = state.isAddedToCart;
      this.message = state.message;
      if(this.message) {
         this.toastr.info(`${this.message}`);
      }
      this.totalNumberOfProducts = state.totalNumOfProductsInCart;
      this.addToCartLoading = state.addToCartLoading;
      this.productQuantity = state.productQty;
      if(this.isAddedToCart && this.product) {
        const initialState = {currentProduct: this.product, size: this.selectedSize['label'], quantity: this.productQuantity};
        this.modalRef = this.modalService.show(CartModalComponent, { class : 'cart-modal', initialState });
      }
    });
    this.store.pipe(select(fromRoot.getWishlist), skip(1)).pipe(
      untilComponentDestroyed(this)
    ).subscribe((state) => {
      this.wishlist = state.wishlist;
      const product_id = +this.route.snapshot.params['product_id'];
      if(this.wishlist.length && this.checkIfProductInWishlist(this.wishlist, product_id)) {
        this.productIsInWishlist = true;
      } else {
        this.productIsInWishlist = false;
      }
    });
  }

  fetchAvailableSizes() {
    this.store.dispatch(new productsActions.GetAvailableSizes(+this.route.snapshot.params['product_id']));
  }

  openModalCart() {
    if(this.authService.isAuthenticated()) {
      if(this.selectedSize && this.selectedSize['value']) {
        this.store.dispatch(new cartActions.AddProductToCart({
          size_id: this.selectedSize['value'], quantity: 1, product_id: this.product['id']
        }));
      } else {
        this.toastr.error('Please Choose a Size!');
      }
    } else {
      this.toastr.error('Please log in to add the product to cart');
    }
  }

  backToSearch(id) {
    this.store.dispatch(new productsActions.SetTargetId(id));
    this.router.navigate(['../'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
  }

  checkIfProductInWishlist(wishlist, product_id) {
    return wishlist.some(obj => obj.product_id == product_id)
  }

  addProductToWishlist(product_id) {
    if(this.authService.isAuthenticated()) {
      this.store.dispatch(new wishlistActions.AddProductToWishlist({
        product_id: product_id
      }));
    } else {
      this.toastr.error('Please log in to add the product to wishlist');
    }
  }

  RemoveProductFromWishlist(product_id) {
    this.store.dispatch(new wishlistActions.DeleteProductFromWishlist({
      product_id: product_id
    }));
  }

  ngOnDestroy(){
    this.store.dispatch(new cartActions.RemoveIsAddedToCart());
  }
}
