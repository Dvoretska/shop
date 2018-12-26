import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { AuthService } from '../auth.service';
import { StorageService } from '../../storage.service';
import {ToastrService} from "ngx-toastr";
import {UserService} from "../../users/user.service";
import {User} from "../../users/user.model";
import {Role} from "../../users/role.model";

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss']
})
export class RegisterModalComponent implements OnInit {
  @ViewChild('password') password: NgModel;
  @ViewChild('password2') password2: NgModel;
  @ViewChild('email') email: NgModel;
  @Output() createdUser = new EventEmitter<any>();
  @Input() createUserMode: boolean = false;
  selectedRole: string = 'user';
  userRole;
  users: User[];
  roles: Role[];
  errors = {};
  constructor(public modalRef: BsModalRef,
              private authService: AuthService,
              private storageService: StorageService,
              private toastr: ToastrService,
              private userService: UserService) { }

  ngOnInit() {
    this.userRole = this.authService.getUserRole();
    if(this.createUserMode) {
      this.userService.getUsers().subscribe(
        (res: {results: User[], meta: Role[]}) => {
          this.users = res.results;
          this.roles = res.meta;
        },
        (err) => {
          this.errors = err.error;
        })
    }
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
    if(!this.createUserMode) {
      this.authService.signupUser(email, password)
        .subscribe((res)=>{
            this.storageService.setItem('token', JSON.stringify(res['token']));
            this.storageService.setItem('user', JSON.stringify(res['user']));
            this.modalRef.hide();
            window.location.reload();
          },
          (err)=>{
            this.errors = err.error;
          })
    } else {
      this.userService.createUser(email, password, this.selectedRole)
        .subscribe((res: {result: any})=>{
            this.modalRef.hide();
            this.createdUser.emit(res.result);
            this.toastr.success('User was created successfully!');
            this.createUserMode = false;
          },
          (err)=>{
            this.toastr.error(`${err.status} ${err.statusText}`);
          })
    }
  }


  checkErrors(type) {
    if(this.errors && (this.errors['password'] || this.errors['email'])) {
      return this.errors[type];
    } else {
      return false;
    }
  }
}
