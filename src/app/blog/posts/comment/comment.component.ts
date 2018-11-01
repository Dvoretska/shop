import { Component, OnInit, Input } from '@angular/core';
import {Comment} from "../../comment.model";
import {ToastrService} from "ngx-toastr";
import {BlogService} from "../../blog.service";
import {Post} from "../../post.model";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment;
  @Input() comments: Comment[];
  @Input() post: Post;
  user: any;
  changedCommentText: string = '';
  isEditMode: boolean = false;
  isViewMode: boolean = true;
  selectedComment: number;

  constructor(private toastr: ToastrService, private blogService: BlogService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  formattedDate(date) {
    return new Date(date)['toGMTString']();
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
        this.toastr.error(`${err.error.rights}`);
      }
    )
  }

  isUpdateCommentAllowed(email) {
    if(this.post) {
      return this.user['role'] == 'admin' || this.user['role'] == 'premium' && this.user['email'] == email;
    }
  }


}
