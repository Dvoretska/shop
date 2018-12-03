import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { AuthService } from '../auth.service';
import { StorageService } from '../../storage.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {
  errors = {};
  constructor(public modalRef: BsModalRef,
              private authService: AuthService,
              private storageService: StorageService,
              private router: Router) { }

  ngOnInit() {
  }

  onLogin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.loginUser(email, password)
      .subscribe((res)=>{
        this.storageService.setItem('user', JSON.stringify(res));
        this.modalRef.hide();
        // window.location.reload();
      },
      (err)=>{
        this.errors = err.error
      })
  }

  checkErrors() {
    if(this.errors && this.errors['non_field_error']) {
      return this.errors['non_field_error'];
    } else {
      return false;
    }
  }
}
