import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Comment} from "../../comment.model";
import {ToastrService} from "ngx-toastr";
import {BlogService} from "../../blog.service";
import {Post} from "../../post.model";
import {AuthService} from "../../../auth/auth.service";

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
  @Output() onDeleteComment = new EventEmitter<number>();
  constructor(private toastr: ToastrService, private blogService: BlogService, private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.getUser();
  }

  formattedDate(time) {
    var date = new Date(time);
    var hours = date.getHours();
    var minutes: string | number  = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes= minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
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

  deleteComment(id) {
    this.blogService.deleteComment(id).subscribe(
      () => {
        this.onDeleteComment.emit(id)
      },
      (err) => {
        this.toastr.error(`${err.error.rights}`);
      }
    )
  }

  isUpdateCommentAllowed(email) {
    if(this.post && this.user) {
      return this.user['role'] == 'admin' || this.user['role'] == 'premium' && this.user['email'] == email;
    } else {
      return false;
    }
  }


}
