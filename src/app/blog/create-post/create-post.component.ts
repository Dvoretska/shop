import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  // @ViewChild('text') text: NgModel;
  text: '';
  selectedFile: File;
  url: string;

  optToolbar = [
  	['bold', 'italic', 'underline', 'strike'],
  	[{ 'size': ['small', false, 'large', 'huge'] }],
	[{ 'list': 'ordered'}, { 'list': 'bullet' }],
	[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
	[{ 'align': [] }],
	[{ 'color': [] }, { 'background': [] }],
	[{ 'font': [] }]
  ];

  constructor() { }

  ngOnInit() {
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    if (/\.(jpe?g|png|gif)$/i.test(event.target.files[0].name)) {
      let reader = new FileReader();
      reader.onload = () => {
        this.url = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onCreatePost(form: NgForm) {
    const savedData:FormData = new FormData();
    savedData.append('title', form.value.title);
    savedData.append('text', this.text);
    savedData.append('file', this.selectedFile);
    
    // this.http.post(`${environment.API_URL}/profile`, savedData)
    //   .subscribe(
    //     (res: {image?: string}) => {
    //       if(res.image) {
    //         this.storageService.updateItem('user', 'image', res.image);
    //       }
    //       this.toastr.success('Your changes have been successfully saved!');
    //     },
    //     (err) => {
    //       this.error = err.error;
    //     });
   
  }

}
