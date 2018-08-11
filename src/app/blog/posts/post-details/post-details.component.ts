import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { BlogService } from "../../blog.service";
import { Post } from "../../post.model";
import { Comment } from "../../comment.model";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";


@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
  @Input() id: number;
  @Input() postsIds: number[];
  @Input() modalIndex: number;
  post: Post;
  comments: Comment[];
  url: string = environment.API_URL;
  displayComments: boolean = false;
  commentText: string = '';
  text: string;
  username: string;

  constructor(public modalRef: BsModalRef, private blogService: BlogService, private router: Router) { }

  ngOnInit() {
    this.getPostDetails();
  }

  getPostDetails() {
    this.blogService.getPostDetails(this.postsIds[this.modalIndex]).subscribe(
      (res:{post: Post, comments: Comment[]}) => {
        this.post = res.post;
        this.comments = res.comments;
      },
      (err) => {
        console.log(err)
      })
  }
  toggleComments() {
    this.displayComments = !this.displayComments;
  }
  formattedDate(date) {
    return new Date(date).toGMTString();

  }
  onAddComment() {
    this.blogService.addComment(this.commentText, this.id).subscribe(
      (res) => {
        this.commentText = '';
        this.comments.push(res.comment)
      }
    )
  }

  nextPost() {
    if(this.modalIndex < this.postsIds.length - 1) {
      this.modalIndex++;
      this.getPostDetails();
    }
  }

  previousPost() {
    if(this.modalIndex > 0) {
      this.modalIndex--;
      this.getPostDetails();
    }
  }

  onEditPost() {
    this.modalRef.hide();
    this.router.navigate(['blog/edit-post/', this.id]);
  }

}

