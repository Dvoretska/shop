import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { ProfileComponent } from './profile/profile.component';

const appRoutes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'users', component: UsersListComponent },
  { path: 'profile', component: ProfileComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}