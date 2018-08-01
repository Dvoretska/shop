import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

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
  url: string = '../../assets/default-picture_0_0.png';
  errorMsgImg: string = '';
  username: string = '';
  constructor(private http: HttpClient, private toastr: ToastrService) { }

  ngOnInit() {
    if(this.getObject('user').image) {
      const image = this.getObject('user').image;
      this.url = `${this.API_URL}/${image}`;
    }
    if(this.getObject('user').email) {
      let lastIndex = this.getObject('user').email.lastIndexOf('@');
      this.username = this.getObject('user').email.substring(0, lastIndex);
    }
  }

  setObject(key, obj) {
    localStorage.setItem(key, JSON.stringify(obj));
  }

  getObject(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  updateItem(key, property, value) {
    var obj = this.getObject(key);
    obj[property] = value;
    this.setObject(key, obj);
  }
  onFileChanged(event) {
    this.isChanged = true
    this.selectedFile = event.target.files[0];
    let reader = new FileReader();
    reader.onload = () => {
      this.url = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }
  onSave() {
    this.errorMsgImg = '';
    const savedData:FormData = new FormData();
    if(this.selectedFile) {
     savedData.append('file', this.selectedFile);
    }
    savedData.append('newPassword', this.newPassword);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'multipart/form-data'
      })
    };
    this.http.post(`${this.API_URL}/profile`, savedData)
      .subscribe(
        (res: {image?: string}) => {
          // if(res.image) {
          //   this.updateItem('user', 'image', res.image);
          // }
          this.toastr.success(' Your changes have been successfully saved!');
        },
        (err) => {
          console.log(err)
          this.errorMsgImg = err.error;
        });
  }

}
