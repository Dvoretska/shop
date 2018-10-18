import { Component, OnInit, OnDestroy } from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Store, select} from "@ngrx/store";
import * as fromRoot from "../../store/shop.reducer";
import {ActivatedRoute, Router} from "@angular/router";
import * as shopActions from "../../store/shop.actions";
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation,NgxGalleryImageSize } from 'ngx-gallery';
import { environment } from 'src/environments/environment';
import {CartModalComponent} from "../../cart/cart-modal/cart-modal.component";
import {BsModalService} from "ngx-bootstrap/modal";
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  getState$: Observable<fromRoot.ShopState>;
  private getStateSubscription: Subscription;
  product;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[] = [];
  sizes = ['XS', 'S', 'M', 'L', 'XL'];
  selectedSize;
  modalRef: BsModalRef;
  loading: boolean;

  constructor(private router: Router, private modalService: BsModalService, private route: ActivatedRoute, private store: Store<fromRoot.ShopState>) { }

  ngOnInit() {
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
        imageSize: NgxGalleryImageSize.Contain
      }
    ];
    this.route.params
      .subscribe((params) => {
        this.store.dispatch(new shopActions.FetchProductDetails(+params['product_id']));
      });
    this.getState$ = this.store.pipe(select('shop'));
    this.getStateSubscription = this.getState$.pipe(
      untilComponentDestroyed(this)
    ).subscribe((state) => {
      this.product = state.product;
      this.loading = state.productDetailsLoading;
      if(this.product) {
        this.galleryImages = [];
        for(let image of this.product.images) {
          let obj = {};
          obj['small'] = `${environment.API_URL}/${image}`;
          obj['medium'] = `${environment.API_URL}/${image}`;
          obj['big'] = `${environment.API_URL}/${image}`;
          this.galleryImages.push(obj);
        }
      }
    });
  }

  openModalCart() {
    this.modalRef = this.modalService.show(CartModalComponent, { class : 'cart-modal' });
  }

  backToSearch(id) {
    this.store.dispatch(new shopActions.SetTargetId(id));
    this.router.navigate(['shop']);
  }

  ngOnDestroy(){}

}
