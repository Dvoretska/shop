import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from '../storage.service';
import { environment } from 'src/environments/environment';
import {AuthService} from "../auth/auth.service";
import * as errorsActions from '../shop/store/actions/errors.actions';
import { Store} from '@ngrx/store';
import * as fromRoot from '../shop/store/reducers/reducer.factory';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  isChanged: boolean = false;
  selectedFile: File;
  newPassword: string = '';
  imageUrl: string;
  errors: {};
  username: string = '';
  constructor(private http: HttpClient,
              private toastr: ToastrService,
              private storageService: StorageService,
              private authService: AuthService,
             private store: Store<fromRoot.AppState>) { }

  ngOnInit() {
    this.authService.tokenVerify().subscribe((res) => {
      this.imageUrl = res['user']['image'] || this.authService.getDefaultUserImage();
      this.username = res['user']['email'].substring(0, res['user']['email'].lastIndexOf('@'));
    });
  }

  imageUrlHandler($event) {
    this.imageUrl = $event;
  }

  fileUploaded($event) {
    this.errors = {};
    this.isChanged = true;
    this.selectedFile = $event;
  }

  onSave() {
    this.errors = {};
    const savedData:FormData = new FormData();
    if(this.selectedFile) {
     savedData.append('file', this.selectedFile);
    }
    savedData.append('password', this.newPassword);
    this.http.post(`${environment.API_URL}/profile`, savedData)
      .subscribe(
        (res: {image?: string}) => {
          if(res.image) {
            this.storageService.updateItem('user', 'image', res.image);
          }
          this.toastr.success('Your changes have been successfully saved!');
          this.newPassword = '';
        },
        (err) => {
          this.errors = err.error;
          this.store.dispatch(new errorsActions.LoadError(err));
        });
  }

  checkErrors(type) {
    if(this.errors && (this.errors['password'] || this.errors['image'])) {
      return this.errors[type];
    } else {
      return false;
    }
  }

}
