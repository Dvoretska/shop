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
    const savedData = new FormData();
    savedData.append('myFile', this.selectedFile, this.newPassword);
    // this.http.post(`${this.API_URL}/register`, savedData)
    //   .subscribe(event => {
    //     console.log(event);
    //   });
  }

}
