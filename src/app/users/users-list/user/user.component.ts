import { Component, OnInit, Input, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import { User } from '../../user.model';
import { Role } from '../../role.model';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../user.service';
import { environment } from 'src/environments/environment';

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
  error: Object = {};
  selectedFile: File;

  constructor(private userService: UserService, private toastr: ToastrService) {}

  ngOnInit() {
    if(this.user['image']) {
      this.user.image = `${environment.API_URL}/${this.user['image']}`;
    } else {
      this.user.image = this.defaultImageUrl;
    }
    this.selectedRole = this.user['role_id']['role'];
  }
  openFileBrowser(event) {
    let el: HTMLElement = this.inputFile.nativeElement as HTMLElement;
    el.click();
  }
  onFileChanged(event) {
    this.error = {};
    this.selectedFile = event.target.files[0];
    if (/\.(jpe?g|png|gif)$/i.test(event.target.files[0].name)) {
      let reader = new FileReader();
      reader.onload = () => {
        this.user.image = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      this.user.image = this.defaultImageUrl;
    }
  }
  onSaveChanges() {
    this.error = {};
    const savedData:FormData = new FormData();
    if(this.selectedFile) {
     savedData.append('file', this.selectedFile);
    }
    savedData.append('newPassword', this.newPassword);
    savedData.append('email', this.user.email);
    savedData.append('selectedRole', this.selectedRole);
    this.userService.updateUser(savedData).subscribe(
      () => {
        this.toastr.success(' Your changes have been successfully saved!');
      },
      (err) => {
        this.error = err.error;
        if(this.error['rights']) {
          this.toastr.error(`${this.error['rights']}`);
        }
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

}
