import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Router } from '@angular/router';
import { RegisterModalComponent } from '../auth/register-modal/register-modal.component';
import { LoginModalComponent } from '../auth/login-modal/login-modal.component';
import { StorageService } from '../storage.service';
import { Subscription } from 'rxjs';
import {select, Store} from "@ngrx/store";
import * as fromRoot from "../shop/store/reducers/reducer.factory";
import {untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";
import * as cartActions from "../shop/store/actions/cart.actions";
import * as wishlistActions from "../shop/store/actions/wishlist.actions";
import { skip} from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

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
  modalRef: BsModalRef;
  username: string;
  imageUrl: string = '';
  quantity: number;
  totalNumberOfProducts: number;
  totalNumOfProductsInWishlist: number;
  private subscription: Subscription;
  isCollapsed = true;
  @ViewChild('cartElement') cartElement:ElementRef;
  @ViewChild('cartElement') wishlistElement:ElementRef;

  constructor(private modalService: BsModalService,
              private router: Router,
              private storageService: StorageService,
              private authService: AuthService,
              private store: Store<fromRoot.AppState>) {}

  ngOnInit() {
     this.authService.tokenVerify().subscribe((res) => {
       if(res['user']) {
          this.imageUrl = res['user']['image'] || this.authService.getDefaultUserImage();
          this.username = res['user']['email'].substring(0, res['user']['email'].lastIndexOf('@'));
       }
    });
    this.subscription = this.storageService.watchStorage().subscribe(() => {
        this.getCurrentUser();
    });

    this.store.pipe(select(fromRoot.getCart), skip(1)).pipe(
      untilComponentDestroyed(this)
    ).subscribe((state) => {
      this.totalNumberOfProducts = state.totalNumOfProductsInCart;
    });
    this.store.pipe(select(fromRoot.getWishlist), skip(1)).pipe(
      untilComponentDestroyed(this)
    ).subscribe((state) => {
      this.totalNumOfProductsInWishlist = state.totalNumOfProductsInWishlist;
    })
  }

  isAuthorized() {
    return this.authService.isAuthenticated() && this.authService.getUser();
  }

  currentRole() {
    return this.authService.getUserRole();
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
    this.imageUrl = this.authService.getUserImage();
  }

  openModalRegister() {
    this.modalRef = this.modalService.show(RegisterModalComponent, { class : 'auth-modal' });
  }

  openModalLogin() {
    this.modalRef = this.modalService.show(LoginModalComponent, { class : 'auth-modal' });
  }

  onLogout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.store.dispatch(new cartActions.ClearCart());
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
