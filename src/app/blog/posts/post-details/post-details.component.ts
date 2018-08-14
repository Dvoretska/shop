import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { BsModalService } from 'ngx-bootstrap/modal';
import { BlogService } from "../../blog.service";
import { Post } from "../../post.model";
import { Comment } from "../../comment.model";
import { environment } from "src/environments/environment";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
  @Input() postsIds: number[];
  @Input() modalIndex: number;
  id: number;
  post: Post;
  comments: Comment[];
  url: string = environment.API_URL;
  displayComments: boolean = false;
  commentText: string = '';
  text: string;
  isEditMode: boolean = false;
  isViewMode: boolean = true;
  selectedComment: number;
  changedCommentText: string = '';
  user: {};
  postOwner: string;


  constructor(private toastr: ToastrService, public modalRef: BsModalRef, private route: ActivatedRoute, public modalService: BsModalService, private blogService: BlogService, private router: Router) { }

  ngOnInit() {
    this.getPostDetails();
    this.id = this.postsIds[this.modalIndex];
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  getPostDetails() {
    this.blogService.getPostDetails(this.postsIds[this.modalIndex]).subscribe(
      (res:{post: Post, comments: Comment[]}) => {
        this.post = res.post;
        this.comments = res.comments;
        this.postOwner = this.post.user_id.email.substring(0, this.post.user_id.email.lastIndexOf('@'))
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
    if (this.commentText) {
      this.blogService.addComment(this.commentText, this.id).subscribe(
      (res: {comment: Comment}) => {
        this.commentText = '';
        this.comments.push(res.comment)
      },
      (err) => {
        this.toastr.error(`${err.error.rights}`);
      })
    }
  }

  onUpdateComment(id) {
    if (this.changedCommentText) {
      this.blogService.updateComment(this.changedCommentText, id).subscribe(
        (res: {comment: Comment}) => {
          let commentIndex = this.comments.findIndex((comment => comment.id == id));
          this.comments[commentIndex].text = res.comment.text;
          this.isEditMode = false;
          this.isViewMode = true;
        },
        (err) => {
          this.toastr.error(`${err.error.rights}`);
        }
      )
    } else {
      this.toastr.error('You can\'t save empty comment!');
    }
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

  onDeleteComment(id) {
    this.blogService.deleteComment(id).subscribe(
      () => {
        this.comments = this.comments.filter((comment) => {
          return comment.id !== id
        })
      },
      (err) => {
        console.log(err)
      })
  }

  isEditPostAllowed() {
    if(this.post) {
      return this.user['role'] == 'admin' || this.user['email'] == this.post.user_id.email;
    }
  }

  isAddCommentAllowed() {
    if(this.post) {
      return this.user['role'] !== 'user' || this.user['email'] == this.post.user_id.email;
    }
  }

  isUpdateCommentAllowed(email) {
    if(this.post) {
      return this.user['role'] == 'admin' || this.user['role'] == 'premium' && this.user['email'] == email;
    }
  }
}

