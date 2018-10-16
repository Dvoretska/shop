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
import { EditProductComponent } from './shop/products/edit-product/edit-product.component';
import { ProductsComponent } from './shop/products/products.component';

const appRoutes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'users', component: UsersListComponent, canActivate: [AuthGuardService] },
  { path: 'shop', component: ShopComponent, children: [
    { path: '', component: ProductsComponent },
    { path: 'create-product', component: EditProductComponent },
    { path: 'product', component: EditProductComponent },
    // { path: ':product_id', component: ProductComponent },
    // { path: 'edit-post/:id', component: EditPostComponent }
  ]},

  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'blog', component: BlogComponent, canActivate: [AuthGuardService], children: [
    { path: '', component: PostsComponent },
    { path: 'create-post', component: EditPostComponent },
    { path: 'edit-post/:id', component: EditPostComponent }
  ]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
