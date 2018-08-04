import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../user.model';
import { Role } from '../role.model';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  users: User[];
  roles: Role[];
  selectedRole: string = 'user';
  error = {};
  @Output() createdUser = new EventEmitter<any>();
  constructor(public modalRef: BsModalRef, private userService: UserService, private toastr: ToastrService) { }

  ngOnInit() {
   this.userService.getUsers().subscribe(
    (res: {results: User[], meta: Role[]}) => {
      this.users = res.results;
      this.roles = res.meta;
    },
    (err) => {
      this.error = err.error;
    })
  }

  onCreateUser(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.userService.createUser(email, password, this.selectedRole)
      .subscribe((res: {result: any})=>{
        this.modalRef.hide();
        this.createdUser.emit(res.result);
        this.toastr.success('User was created successfully!');
      },
      (err)=>{
        this.error = err.error
      })
  }
}
