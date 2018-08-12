import {Component, OnInit, Input } from '@angular/core';
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
  isEditMode: boolean = false;
  isViewMode: boolean = true;
  selectedComment: number;
  changedCommentText: string = '';

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
    return new Date(date)['toGMTString']();

  }
  onAddComment() {
    this.blogService.addComment(this.commentText, this.id).subscribe(
      (res: {comment: Comment}) => {
        this.commentText = '';
        this.comments.push(res.comment)
      }
    )
  }

  onUpdateComment() {
    this.blogService.updateComment(this.changedCommentText, this.id).subscribe(
      (res: {comment: Comment}) => {
        this.commentText = res.comment.text;
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

  onEditComment(id, text) {
    this.selectedComment = id;
    this.isViewMode = false;
    this.isEditMode = true;
    this.changedCommentText = text;
  }

}

