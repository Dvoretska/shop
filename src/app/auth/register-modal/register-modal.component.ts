import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {NgForm, NgModel} from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss']
})
export class RegisterModalComponent implements OnInit {
  @ViewChild('password') password: NgModel;
  @ViewChild('password2') password2: NgModel;
  @ViewChild('email') email: NgModel;
  errors = {};
  constructor(public modalRef: BsModalRef, private authService: AuthService) { }

  ngOnInit() {
  }

  passwordMatchError() {
    return this.password.value !== this.password2.value
  }
  isDisabled() {
    return !this.email.valid || !this.password.value || this.passwordMatchError()
  }
  onSignup(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signupUser(email, password)
      .subscribe((res)=>{},
        (err)=>{
          this.errors = err.error
        })
  }
}
