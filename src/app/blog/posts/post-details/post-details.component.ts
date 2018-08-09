import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { BlogService } from "../../blog.service";
import { Post } from "../../post.model";
import { Comment } from "../../comment.model";
import { environment } from "src/environments/environment";


@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
  @Input() id: number;
  post: Post;
  comments: Comment[];
  url: string = environment.API_URL;
  displayComments: boolean = false;

  constructor(public modalRef: BsModalRef, private blogService: BlogService) { }

  ngOnInit() {
    this.blogService.getPostDetails(this.id).subscribe(
      (res:{post: Post, comments: Comment[]}) => {
        console.log(res);
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

}

