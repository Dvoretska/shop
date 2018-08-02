import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { User } from '../../user.model';
import { Role } from '../../role.model';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: '[app-user]',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input() user: User;
  @Input() roles: Role;
  @Output() deletedUser = new EventEmitter<string>();
  imagePath: string;
  API_URL = 'http://localhost:3000';
  selectedRole: string = '';
  defaultImageUrl: string = '../../assets/default-picture_0_0.png';
  newPassword: string = '';
  errorMsgImg: string;

  constructor(private userService: UserService,
              private http: HttpClient,
              private toastr: ToastrService) {}

  ngOnInit() {
    if(this.user['image']) {
      this.imagePath = `${this.API_URL}/${this.user['image']}`;
    } else {
      this.imagePath = this.defaultImageUrl;
    }
    this.selectedRole = this.user['role_id']['role'];
  }
  onSaveChanges() {
    this.errorMsgImg = '';
    const savedData:FormData = new FormData();
    // if(this.selectedFile) {
    //  savedData.append('file', this.selectedFile);
    // }
    savedData.append('newPassword', this.newPassword);
    savedData.append('email', this.user.email);
    savedData.append('selectedRole', this.selectedRole);
    this.http.post(`${this.API_URL}/update`, savedData)
      .subscribe(
        (res) => {
          // if(res.image) {
          //   this.storageService.updateItem('user', 'image', res.image);
          // }
          this.toastr.success(' Your changes have been successfully saved!');
        },
        (err) => {
          console.log(err)
          this.errorMsgImg = err.error;
        });
  }

  onDeleteUser() {
    this.userService.deleteUser(this.user.email).subscribe(
      (res) => {
        this.deletedUser.emit(this.user.email)
      },
      (err) => {
        console.log(err)
      })
  }

}
