import { Component, OnInit, Input, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import { User } from '../user.model';
import { Role } from '../role.model';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';
import { environment } from 'src/environments/environment';
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: '[app-user]',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input() user: User;
  @Input() roles: Role;
  @Output() deletedUser = new EventEmitter<string>();
  @ViewChild('inputFile') inputFile: ElementRef;
  selectedRole: string = '';
  defaultImageUrl: string = '../../assets/default-picture_0_0.png';
  newPassword: string = '';
  errors: {};
  selectedFile: File;
  currentUserRole: string;

  constructor(private userService: UserService,
              private toastr: ToastrService,
              private authService: AuthService) {}

  ngOnInit() {
    if(this.user['image']) {
      this.user.image = this.user['image'];
    } else {
      this.user.image = this.defaultImageUrl;
    }
    this.currentUserRole = this.authService.getUserRole();
    this.selectedRole = this.user['role_id']['role'];
  }
  openFileBrowser(event) {
    let el: HTMLElement = this.inputFile.nativeElement as HTMLElement;
    el.click();
  }

  imageUrlHandler($event) {
    if($event) {
      this.user.image = $event;
    } else {
      this.user.image = this.defaultImageUrl;
    }
  }

  fileUploaded($event) {
    this.selectedFile = $event;
  }

  onSaveChanges() {
    this.errors = {};
    const savedData:FormData = new FormData();
    if(this.selectedFile) {
     savedData.append('file', this.selectedFile);
    }
    savedData.append('password', this.newPassword);
    savedData.append('email', this.user.email);
    savedData.append('selectedRole', this.selectedRole);
    this.userService.updateUser(savedData).subscribe(
      () => {
        this.toastr.success(' Your changes have been successfully saved!');
        this.newPassword = '';
      },
      (err) => {
        this.errors = err.error;
        if(this.errors['rights']) {
          this.toastr.error(`${this.errors['rights']}`);
        }
        this.newPassword = '';
      });
  }

  onDeleteUser() {
    this.userService.deleteUser(this.user.email).subscribe(
      () => {
        this.deletedUser.emit(this.user.email);
        this.toastr.success('User was deleted successfully!');
      },
      (err) => {
        this.toastr.error(`${err.error}`);
      })
  }

  isCurrentUser() {
    return this.user.email == JSON.parse(localStorage.getItem('user')).email
  }

  checkErrors() {
    if(this.errors && (this.errors['password'])) {
      return this.errors['password'];
    } else {
      return false;
    }
  }
}
