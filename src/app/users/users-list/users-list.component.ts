import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { Role } from '../role.model';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { UserCreateComponent } from '../user-create/user-create.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.components.scss']
})
export class UsersListComponent implements OnInit {
  users: User[];
  roles: Role[];
  errorMsg: string = '';
  myRole: string;
  myAvatarUrl: string;
  modalRef: BsModalRef;
  API_URL = 'http://localhost:3000';
  defaultImageUrl: string = '../../assets/default-picture_0_0.png';
  constructor(private userService: UserService, private modalService: BsModalService) { }

  ngOnInit() {
    this.myRole = JSON.parse(localStorage.getItem('user')).role.charAt(0).toUpperCase() + JSON.parse(localStorage.getItem('user')).role.slice(1);
    if(JSON.parse(localStorage.getItem('user')).image) {
      this.myAvatarUrl = `${this.API_URL}/${JSON.parse(localStorage.getItem('user')).image}`;
    } else {
      this.myAvatarUrl = this.defaultImageUrl;
    }
    this.userService.getUsers().subscribe(
      (res: {results: User[], meta: Role[]}) => {
        this.users = res.results;
        this.roles = res.meta;
      },
      (err) => {
        this.errorMsg = err.error;
      })
  }

  onCreateUser() {
     this.modalRef = this.modalService.show(UserCreateComponent);
  }

  onClearUsers(email) {
    this.users = this.users.filter((user) => {
      return user.email !== email
    })
  }
}
