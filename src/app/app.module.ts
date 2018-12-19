import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './auth/token.interceptor';
import { StoreModule } from '@ngrx/store';
import { reducers } from './shop/store/reducers/reducer.factory';
import { AppRoutingModule } from './app-routing.module';
import { EffectsModule } from "@ngrx/effects";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CartEffects } from "./shop/store/effects/cart.effects";
import { ErrorsEffects } from "./shop/store/effects/errors.effects";
import { WishlistEffects } from "./shop/store/effects/wishlist.effects";
import { ProductsEffects } from "./shop/store/effects/products.effects";
import { OrderEffects } from "./shop/store/effects/order.effects";
import { CategoriesEffects } from "./shop/store/effects/categories.effects";

import { AuthService } from './auth/auth.service';
import { StorageService } from './storage.service';
import { UserService } from './users/user.service';
import { BlogService } from './blog/blog.service';
import { AuthGuardService } from './auth/auth-guard.service';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ToastrModule } from 'ngx-toastr';
import { QuillModule } from 'ngx-quill';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { InViewportModule } from 'ng-in-viewport';
import { NgxMasonryModule } from 'ngx-masonry';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxGalleryModule } from 'ngx-gallery';
import { TreeviewModule } from 'ngx-treeview';

import { FileUploadDirective } from './directives/file-upload.directive';
import { HoverDirective } from './directives/hover.directive';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LandingComponent } from './landing/landing.component';
import { RegisterModalComponent } from './auth/register-modal/register-modal.component';
import { LoginModalComponent } from './auth/login-modal/login-modal.component';
import { PostDetailsComponent } from './blog/posts/post-details/post-details.component';
import { EditPostComponent } from './blog/edit-post/edit-post.component';
import { ProfileComponent } from './profile/profile.component';
import { UserComponent } from './users/user/user.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { PostsComponent } from './blog/posts/posts.component';
import { PostComponent } from './blog/posts/post/post.component';
import { BlogComponent } from './blog/blog.component';
import { ShopComponent } from './shop/shop.component';
import { CornersComponent } from './UI/corners/corners.component';
import { ProductComponent } from './shop/products/product/product.component';
import { EditProductComponent } from './shop/products/edit-product/edit-product.component';
import { ProductsComponent } from './shop/products/products.component';
import { ProductDetailsComponent } from './shop/products/product-details/product-details.component';
import { CartListComponent } from './shop/cart/cart-list/cart-list.component';
import { CartModalComponent } from './shop/cart/cart-modal/cart-modal.component';
import { CartItemComponent } from './shop/cart/cart-item/cart-item.component';
import { WishlistComponent } from './shop/wishlist/wishlist.component';
import { WishlistItemComponent } from './shop/wishlist/wishlist-item/wishlist-item.component';
import { CommentComponent } from './blog/posts/comment/comment.component';
import { SaleComponent } from './UI/sale/sale.component';
import { ClockComponent } from './UI/clock/clock.component';
import { OrderFormComponent } from './shop/order/order-form/order-form.component';
import { SpinnerComponent } from './UI/spinner/spinner.component';
import { CurrentOrderComponent } from './shop/order/current-order/current-order.component';
import { RippleComponent } from './UI/ripple/ripple.component';
import { ButtonComponent } from './UI/button/button.component';
import { OrdersListComponent } from './shop/order/orders-list/orders-list.component';
import { OrderItemComponent } from './shop/order/order-item/order-item.component';
import { FilterComponent } from './shop/products/filter/filter.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdminComponent } from './shop/admin/admin.component';
import { CategoriesComponent } from './shop/admin/categories/categories.component';
import { TreeComponent } from './UI/tree/tree.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LandingComponent,
    RegisterModalComponent,
    LoginModalComponent,
    ProfileComponent,
    UserComponent,
    UsersListComponent,
    PostsComponent,
    PostComponent,
    BlogComponent,
    PostDetailsComponent,
    EditPostComponent,
    ShopComponent,
    CornersComponent,
    ProductComponent,
    EditProductComponent,
    ProductsComponent,
    FileUploadDirective,
    ProductDetailsComponent,
    CartListComponent,
    CartModalComponent,
    CartItemComponent,
    HoverDirective,
    WishlistComponent,
    WishlistItemComponent,
    CommentComponent,
    SaleComponent,
    ClockComponent,
    OrderFormComponent,
    SpinnerComponent,
    CurrentOrderComponent,
    RippleComponent,
    ButtonComponent,
    OrdersListComponent,
    OrderItemComponent,
    FilterComponent,
    NotFoundComponent,
    AdminComponent,
    CategoriesComponent,
    TreeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    AppRoutingModule,
    CollapseModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    QuillModule,
    NgxPageScrollModule,
    InViewportModule,
    NgxMasonryModule,
    TreeviewModule.forRoot(),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([CartEffects, ProductsEffects, ErrorsEffects, WishlistEffects, OrderEffects, CategoriesEffects]),
    NgxGalleryModule
  ],
  providers: [AuthService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
    },
  StorageService,
  UserService,
  BlogService,
  AuthGuardService,
  { provide: 'Window',  useValue: window }],
  bootstrap: [AppComponent],
  entryComponents: [RegisterModalComponent, LoginModalComponent, PostDetailsComponent, CartModalComponent, SaleComponent]
})
export class AppModule { }
