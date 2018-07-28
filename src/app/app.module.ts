import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { LandingComponent } from './landing/landing.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RegisterModalComponent } from './auth/register-modal/register-modal.component';
import { LoginModalComponent } from './auth/login-modal/login-modal.component';
import { AuthService } from './auth/auth.service';
import { CollapseModule } from 'ngx-bootstrap/collapse';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LandingComponent,
    RegisterModalComponent,
    LoginModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    CollapseModule.forRoot()
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
  entryComponents: [RegisterModalComponent, LoginModalComponent]
})
export class AppModule { }
