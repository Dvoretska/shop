import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuthService } from '../auth.service';
import { StorageService } from '../../storage.service';
import {environment} from '../../../environments/environment'

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {
  errors = {};
  constructor(public modalRef: BsModalRef,
              private authService: AuthService,
              private storageService: StorageService) { }

  ngOnInit() {
  }

  goToGoogleAuth() {
    window.location.href=`${environment.API_URL}/auth/google`
  }

  onLogin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.loginUser(email, password)
      .subscribe((res)=>{
        this.storageService.setItem('token', JSON.stringify(res['token']));
        this.storageService.setItem('user', JSON.stringify(res['user']));
        this.modalRef.hide();
        window.location.reload();
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
