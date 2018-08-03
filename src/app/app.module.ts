import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http'
import { Routes, RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './auth/token.interceptor';

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
import { UserCreateComponent } from './users/user-create/user-create.component';

const appRoutes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'users', component: UsersListComponent },
  { path: 'profile', component: ProfileComponent }
];

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
    UserCreateComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    })
  ],
  providers: [AuthService, {
              provide: HTTP_INTERCEPTORS,
              useClass: TokenInterceptor,
              multi: true
            },
            StorageService,
            UserService],
  bootstrap: [AppComponent],
  entryComponents: [RegisterModalComponent, LoginModalComponent, UserCreateComponent]
})
export class AppModule { }
