import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { ProfileComponent } from './profile/profile.component';
import { BlogComponent } from './blog/blog.component';
import { PostsComponent } from './blog/posts/posts.component';
import { CreatePostComponent } from './blog/create-post/create-post.component';

const appRoutes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'users', component: UsersListComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'blog', component: BlogComponent, children: [
    { path: '', component: PostsComponent },
    { path: 'create-post', component: CreatePostComponent }
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