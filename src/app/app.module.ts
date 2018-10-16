import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './auth/token.interceptor';
import { StoreModule } from '@ngrx/store';
import { shopReducer } from './shop/store/shop.reducer';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { LandingComponent } from './landing/landing.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RegisterModalComponent } from './auth/register-modal/register-modal.component';
import { LoginModalComponent } from './auth/login-modal/login-modal.component';
import { AuthService } from './auth/auth.service';
import { StorageService } from './storage.service';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ProfileComponent } from './profile/profile.component';
import { UserComponent } from './users/users-list/user/user.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { UserService } from './users/user.service';
import { BlogService } from './blog/blog.service';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { AppRoutingModule } from './app-routing.module';
import { PostsComponent } from './blog/posts/posts.component';
import { PostComponent } from './blog/posts/post/post.component';
import { BlogComponent } from './blog/blog.component';
import { QuillModule } from 'ngx-quill';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { InViewportModule } from 'ng-in-viewport';
import { NgxMasonryModule } from 'ngx-masonry';
import { PostDetailsComponent } from './blog/posts/post-details/post-details.component';
import { EditPostComponent } from './blog/edit-post/edit-post.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { ShopComponent } from './shop/shop.component';
import { HeaderComponent } from './header/header.component';
import { CornersComponent } from './corners/corners.component';
import { ProductComponent } from './shop/products/product/product.component';
import { EditProductComponent } from './shop/products/edit-product/edit-product.component';
import { ProductsComponent } from './shop/products/products.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FileUploadDirective } from './shared/file-upload.directive';
import { ImagePreviewDirective } from './shared/img-preview.directive';
import { EditorOptionsService } from './shared/editor-options.service';
import {EffectsModule} from "@ngrx/effects";
import {ShopEffects} from "./shop/store/shop.effects";
import { ProductDetailsComponent } from './shop/products/product-details/product-details.component';


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
    UserCreateComponent,
    PostsComponent,
    PostComponent,
    BlogComponent,
    PostDetailsComponent,
    EditPostComponent,
    ShopComponent,
    HeaderComponent,
    CornersComponent,
    ProductComponent,
    EditProductComponent,
    ProductsComponent,
    FileUploadDirective,
    ImagePreviewDirective,
    ProductDetailsComponent
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
    StoreModule.forRoot({shop: shopReducer}),
    EffectsModule.forRoot([ShopEffects])
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
  EditorOptionsService,
  { provide: 'Window',  useValue: window }],
  bootstrap: [AppComponent],
  entryComponents: [RegisterModalComponent, LoginModalComponent, UserCreateComponent, PostDetailsComponent]
})
export class AppModule { }
