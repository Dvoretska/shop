import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { ProfileComponent } from './profile/profile.component';
import { BlogComponent } from './blog/blog.component';
import { PostsComponent } from './blog/posts/posts.component';
import { EditPostComponent } from './blog/edit-post/edit-post.component';
import { ShopComponent } from './shop/shop.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { ProductsComponent } from './shop/products/products.component';
import { ProductDetailsComponent } from './shop/products/product-details/product-details.component';
import { CartListComponent } from './shop/cart/cart-list/cart-list.component';
import { WishlistComponent } from './shop/wishlist/wishlist.component';
import { OrderFormComponent } from './shop/orders/order-form/order-form.component';
import { CurrentOrderComponent } from './shop/orders/current-order/current-order.component';
import { OrdersListComponent } from './shop/orders/orders-list/orders-list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AdminGuard } from './auth/admin.guard';

const appRoutes: Routes = [
  { path: '', component: MainLayoutComponent, children: [
    { path: '', component: LandingComponent },
    { path: 'users', component: UsersListComponent, canActivate: [AuthGuardService] },
    { path: 'shop', component: ShopComponent, children: [
      { path: 'products', component: ProductsComponent},
      { path: 'products/:product_id', component: ProductDetailsComponent},
      { path: 'wishlist', component: WishlistComponent },
      { path: 'cart', component: CartListComponent, children: [
        { path: 'order', component: OrderFormComponent},
      ]},
      { path: 'order/:order_number', component: CurrentOrderComponent },
      { path: 'orders', component: OrdersListComponent }
    ]},
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
    { path: 'blog', component: BlogComponent, children: [
      { path: '', component: PostsComponent },
      { path: 'post/create', component: EditPostComponent },
      { path: 'post/edit/:id', component: EditPostComponent }
    ]},
  ]},
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule', canActivate: [ AdminGuard ]},
  { path: '**',  component: NotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
