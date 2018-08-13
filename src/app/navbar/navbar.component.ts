import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Router } from '@angular/router';
import { RegisterModalComponent } from '../auth/register-modal/register-modal.component';
import { LoginModalComponent } from '../auth/login-modal/login-modal.component';
import { StorageService } from '../storage.service';
import { environment } from 'src/environments/environment';

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

export class NavbarComponent implements OnInit {
  isCollapsed = true;
  modalRef: BsModalRef;
  currentUser: CurrentUser;
  username: string;
  imageUrl: string = '';
  defaultImageUrl: string = 'src/assets/default-picture_0_0.png';
  constructor(private modalService: BsModalService,
              private router: Router,
              private storageService: StorageService) {}

  ngOnInit() {
    this.getCurrentUser();
    this.storageService.watchStorage().subscribe(() => {
        this.getCurrentUser();
    });
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
  isAuthorized() {
    return localStorage.getItem('user');
  }
  onLogout() {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
}
