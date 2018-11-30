import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { Role } from '../role.model';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { environment } from 'src/environments/environment';
import {RegisterModalComponent} from "../../auth/register-modal/register-modal.component";

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
  defaultImageUrl: string = '../../assets/default-picture_0_0.png';
  constructor(private userService: UserService, private modalService: BsModalService) { }

  ngOnInit() {
    this.myRole = JSON.parse(localStorage.getItem('user')).role;
    if (JSON.parse(localStorage.getItem('user')).image) {
      this.myAvatarUrl = `${environment.API_URL}/${JSON.parse(localStorage.getItem('user')).image}`;
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
    const initialState = { createUserMode: true};
    this.modalRef = this.modalService.show(RegisterModalComponent, { class : 'auth-modal', initialState });
    this.modalRef.content.createdUser.subscribe(data => {
      this.users.push(data);
   });
  }

  onClearUsers(email) {
    this.users = this.users.filter((user) => {
      return user.email !== email
    })
  }
}
