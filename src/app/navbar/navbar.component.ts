import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Router } from '@angular/router';
import { RegisterModalComponent } from '../auth/register-modal/register-modal.component';
import { LoginModalComponent } from '../auth/login-modal/login-modal.component';
import { StorageService } from '../storage.service';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import {select, Store} from "@ngrx/store";
import * as fromRoot from "../shop/store/reducers/reducer.factory";
import {untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";
import * as cartActions from "../shop/store/actions/cart.actions";
import * as wishlistActions from "../shop/store/actions/wishlist.actions";
import { skip} from 'rxjs/operators';

export interface CurrentUser {
  email: string;
  image?: string;
  role: string;
  token: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit, OnDestroy, AfterViewInit {
  isCollapsed = true;
  modalRef: BsModalRef;
  currentUser: CurrentUser;
  username: string;
  imageUrl: string = '';
  quantity: number;
  totalNumberOfProducts: number;
  totalNumOfProductsInWishlist: number;
  defaultImageUrl: string = 'src/assets/default-picture_0_0.png';
  private subscription: Subscription;
  @ViewChild('cartElement') cartElement:ElementRef;
  @ViewChild('cartElement') wishlistElement:ElementRef;

  constructor(private modalService: BsModalService,
              private router: Router,
              private storageService: StorageService,
              private store: Store<fromRoot.AppState>) {}

  ngOnInit() {
    this.getCurrentUser();
    this.subscription = this.storageService.watchStorage().subscribe(() => {
        this.getCurrentUser();
    });

    this.store.pipe(select(fromRoot.getCart), skip(1)).pipe(
      untilComponentDestroyed(this)
    ).subscribe((state) => {
      this.totalNumberOfProducts = state.totalNumOfProductsInCart;
    })
    this.store.pipe(select(fromRoot.getWishlist), skip(1)).pipe(
      untilComponentDestroyed(this)
    ).subscribe((state) => {
      this.totalNumOfProductsInWishlist = state.totalNumOfProductsInWishlist;
    })
  }

  isAuthorized() {
    return localStorage.getItem('user');
  }

  ngAfterViewInit() {
    if(this.cartElement) {
      this.store.dispatch(new cartActions.GetTotalNumberOfProducts());
    }
    if(this.wishlistElement) {
      this.store.dispatch(new wishlistActions.GetTotalNumOfProductsInWishlist());
    }
  }

  getCurrentUser() {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    if(this.currentUser) {
      if(this.currentUser.image) {
        this.imageUrl = `${environment.API_URL}/${this.currentUser.image}`;
      } else {
        this.imageUrl = this.defaultImageUrl;
      }
      this.username = this.currentUser.email.substring(0, this.currentUser.email.lastIndexOf('@'));
    }
  }

  openModalRegister() {
    this.modalRef = this.modalService.show(RegisterModalComponent, { class : 'auth-modal' });
  }

  openModalLogin() {
    this.modalRef = this.modalService.show(LoginModalComponent, { class : 'auth-modal' });
  }

  onLogout() {
    localStorage.removeItem('user');
    this.store.dispatch(new cartActions.ClearCart());
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
