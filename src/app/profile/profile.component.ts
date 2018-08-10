import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from '../storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  isChanged: boolean = false;
  selectedFile: File;
  newPassword: string = '';
  url: string;
  defaultImageUrl: string = 'src/assets/default-picture_0_0.png';
  error: Object = {};
  username: string = '';
  constructor(private http: HttpClient,
              private toastr: ToastrService,
              private storageService: StorageService) { }

  ngOnInit() {
    if(this.getObject('user').image) {
      const image = this.getObject('user').image;
      this.url = `${environment.API_URL}/${image}`;
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
    this.error = {};
    this.isChanged = true;
    this.selectedFile = event.target.files[0];
    if (/\.(jpe?g|png|gif)$/i.test(event.target.files[0].name)) {
      let reader = new FileReader();
      reader.onload = () => {
        this.url = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSave() {
    this.error = {};
    const savedData:FormData = new FormData();
    if(this.selectedFile) {
     savedData.append('file', this.selectedFile);
    }
    savedData.append('newPassword', this.newPassword);
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
          this.error = err.error;
        });
  }

}
