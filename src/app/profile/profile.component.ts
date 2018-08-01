import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  selectedFile: File;
  newPassword: string = '';
  API_URL = 'http://localhost:3000';
  url: string = '../../assets/default-picture_0_0.png';
  constructor(private http: HttpClient) { }

  ngOnInit() {
    const image = JSON.parse(localStorage.getItem('user')).image;
    if (image) {
      this.url = `${this.API_URL}/${image}`;
    }
  }
  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
  onSave() {
    const savedData:FormData = new FormData();
    savedData.append('file', this.selectedFile);
    savedData.append('newPassword', this.newPassword);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'multipart/form-data'
      })
    };
    this.http.post(`${this.API_URL}/profile`, savedData)
      .subscribe(event => {
        console.log(event);
      });
  }

}
