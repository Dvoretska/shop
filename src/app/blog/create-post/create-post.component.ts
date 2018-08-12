import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BlogService } from '../blog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  text: '';
  selectedFile: File;
  url: string;

  optToolbar = [
  	['bold', 'italic', 'underline', 'strike'],
  	[{ 'size': ['small', 'large', 'huge'] }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'align': [] }]
  ];

  constructor(private blogService: BlogService, private router: Router) { }

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
    this.blogService.createPost(savedData).subscribe(
      () => {
        this.router.navigate(['/blog']);
      },
      (err) => {
        console.log(err)
      })
  }

  isDisabled(form: NgForm) {
    return !(form.value.title && this.text && this.selectedFile)
  }

}
