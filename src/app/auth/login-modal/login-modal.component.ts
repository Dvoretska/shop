import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {
  errors = {};
  constructor(public modalRef: BsModalRef, private authService: AuthService) { }

  ngOnInit() {
  }

  onLogin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.loginUser(email, password)
      .subscribe((res)=>{
        localStorage.setItem('user', JSON.stringify(res));
        this.modalRef.hide();
      },
      (err)=>{
        this.errors = err.error
      })
  }
}
