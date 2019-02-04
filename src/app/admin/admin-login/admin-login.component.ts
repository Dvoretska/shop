import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  errors = {};
  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
  }

  onLoginAdmin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.errors = {};
    this.authService.loginUser(email, password)
      .subscribe((res)=>{
        if(res['user']['role'] !== 'admin') {
          this.toastr.error('Access denied - Admins only');
        } else {
          this.router.navigate(['admin']);
        }
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
