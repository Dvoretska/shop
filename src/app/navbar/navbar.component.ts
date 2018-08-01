import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Router } from '@angular/router';

import { RegisterModalComponent } from '../auth/register-modal/register-modal.component';
import { LoginModalComponent } from '../auth/login-modal/login-modal.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isCollapsed = true;
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService, private router: Router) {}

  ngOnInit() {
  }

  openModalRegister() {
    this.modalRef = this.modalService.show(RegisterModalComponent);
  }
  openModalLogin() {
    this.modalRef = this.modalService.show(LoginModalComponent);
  }
  isAuthorized() {
    return localStorage.getItem('user');
  }
  onLogout() {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
}
