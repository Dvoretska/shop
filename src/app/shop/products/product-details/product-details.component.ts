import { Component, OnInit, OnDestroy } from '@angular/core';
import {Store, select} from "@ngrx/store";
import * as fromRoot from "../../store/reducers/reducer.factory";
import {ActivatedRoute, Router} from "@angular/router";
import * as productsActions from "../../store/actions/products.actions";
import * as cartActions from "../../store/actions/cart.actions";
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation,NgxGalleryImageSize } from 'ngx-gallery';
import { environment } from 'src/environments/environment';
import {CartModalComponent} from "../../cart/cart-modal/cart-modal.component";
import {BsModalService} from "ngx-bootstrap/modal";
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";
import {ToastrService} from "ngx-toastr";
import {Product} from '../../models/product.model';
import {skip} from 'rxjs/operators'
import * as wishlistActions from "../../store/actions/wishlist.actions";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {;
  product: Product;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[] = [];
  sizes: string[];
  selectedSize: string;
  modalRef: BsModalRef;
  productDetailsLoading: boolean;
  products: Product[];
  addToCartLoading: boolean;
  isAddedToCart: boolean;
  totalNumberOfProducts: number;
  productQuantity;
  wishlist: any[];
  productIsInWishlist: boolean = false;

  constructor(private toastr: ToastrService,
              private router: Router,
              private modalService: BsModalService,
              private route: ActivatedRoute,
              private store: Store<fromRoot.AppState>) { }

  ngOnInit() {
    this.store.dispatch(new wishlistActions.FetchWishlist());
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
      this.sizes = state.sizes;
      this.productDetailsLoading = state.productDetailsLoading;
      if(this.product) {
        this.galleryImages = [];
        for(let image of this.product['images']) {
          let settings = {};
          settings['small'] = `${environment.API_URL}/${image}`;
          settings['medium'] = `${environment.API_URL}/${image}`;
          settings['big'] = `${environment.API_URL}/${image}`;
          this.galleryImages.push(settings);
        }
      }
    });
    this.store.pipe(select(fromRoot.getCart)).pipe(
      untilComponentDestroyed(this)
    ).subscribe((state) => {
      this.isAddedToCart = state.isAddedToCart;
      this.totalNumberOfProducts = state.totalNumOfProductsInCart;
      this.addToCartLoading = state.addToCartLoading;
      this.productQuantity = state.productQty;
      if(this.isAddedToCart && this.product) {
        const initialState = {currentProduct: this.product, size: this.selectedSize, quantity: this.productQuantity};
        this.modalRef = this.modalService.show(CartModalComponent, { class : 'cart-modal', initialState });
      }
    });
    this.store.pipe(select(fromRoot.getWishlist), skip(1)).pipe(
      untilComponentDestroyed(this)
    ).subscribe((state) => {
      this.wishlist = state.wishlist;
      const product_id = +this.route.snapshot.params['product_id'];
      if(this.checkIfProductInWishlist(this.wishlist, product_id)) {
        this.productIsInWishlist = true;
      } else {
        this.productIsInWishlist = false;
      }
    });
  }

  openModalCart() {
    if(this.selectedSize) {
      this.store.dispatch(new cartActions.AddProductToCart({
        size: this.selectedSize, quantity: 1, product_id: this.product['id']
      }));
    } else {
      this.toastr.error('Please Choose a Size!');
    }
  }

  backToSearch(id) {
    this.store.dispatch(new productsActions.SetTargetId(id));
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  checkIfProductInWishlist(wishlist, product_id) {
    return wishlist.some(obj => obj.product_id == product_id)
  }

  addProductToWishlist(product_id) {
    this.store.dispatch(new wishlistActions.AddProductToWishlist({
      product_id: product_id
    }));
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
