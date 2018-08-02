import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  isChanged: boolean = false;
  selectedFile: File;
  newPassword: string = '';
  API_URL = 'http://localhost:3000';
  url: string;
  defaultImageUrl: string = '../../assets/default-picture_0_0.png';
  errorMsgImg: string = '';
  username: string = '';
  constructor(private http: HttpClient,
              private toastr: ToastrService,
              private storageService: StorageService) { }

  ngOnInit() {
    if(this.getObject('user').image) {
      const image = this.getObject('user').image;
      this.url = `${this.API_URL}/${image}`;
    } else {
      this.url = this.defaultImageUrl;
    }
    if(this.getObject('user').email) {
      this.username = this.getObject('user').email.substring(0, this.getObject('user').email.lastIndexOf('@'));
    }
  }
  getObject(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  onFileChanged(event) {
    this.errorMsgImg = '';
    this.isChanged = true;
    this.selectedFile = event.target.files[0];
    if (/\.(jpe?g|png|gif)$/i.test(event.target.files[0].name)) {
      let reader = new FileReader();
      reader.onload = () => {
        this.url = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      this.url = this.defaultImageUrl;
    }
  }

  onSave() {
    this.errorMsgImg = '';
    const savedData:FormData = new FormData();
    if(this.selectedFile) {
     savedData.append('file', this.selectedFile);
    }
    savedData.append('newPassword', this.newPassword);
    this.http.post(`${this.API_URL}/profile`, savedData)
      .subscribe(
        (res: {image?: string}) => {
          if(res.image) {
            this.storageService.updateItem('user', 'image', res.image);
          }
          this.toastr.success(' Your changes have been successfully saved!');
        },
        (err) => {
          console.log(err)
          this.errorMsgImg = err.error;
        });
  }

}
