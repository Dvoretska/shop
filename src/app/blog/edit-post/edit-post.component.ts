import { Component, OnInit, Input } from '@angular/core';
import { BlogService } from '../blog.service';
import {Post} from "../post.model";
import {Comment} from "../comment.model";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
  post: Post;
  imageURL: string;
  selectedFile: File;
  constructor(private blogService: BlogService, private router: Router, private route: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit() {
    if (this.route.snapshot.params.id && Number.isInteger(+this.route.snapshot.params.id)) {
      this.blogService.getPostDetails(this.route.snapshot.params.id).subscribe(
      (res:{post: Post, comments: Comment[]}) => {
        this.post = res.post;
        this.imageURL = `${environment.API_URL}/${this.post['image']}`;
      },
      (err) => {
        console.log(err)
      })
    }
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    if (/\.(jpe?g|png|gif)$/i.test(event.target.files[0].name)) {
      let reader = new FileReader();
      reader.onload = () => {
        this.imageURL = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onDeletePost() {
    this.blogService.deletePost(this.post.id).subscribe(
      () => {
        this.toastr.success('Post was deleted successfully!');
        this.router.navigate(['blog']);
      },
      (err) => {
        console.log(err);
      });
  }

  onUpdatePost() {
     let savedData:FormData = new FormData();
     savedData.append('title', this.post.title);
     savedData.append('content', this.post.content);
     savedData.append('file', this.selectedFile);
     savedData.append('id', this.post.id);
     this.blogService.updatePost(savedData).subscribe(
      () => {
        this.toastr.success('Post was saved successfully!');
        this.router.navigate(['blog']);
      },
      (err) => {
        console.log(err);
      });
  }

  isDisabled(form: NgForm) {
    return !(this.post.title && this.post.content)
  }

}
