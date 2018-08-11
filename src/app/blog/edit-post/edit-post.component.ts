import { Component, OnInit, Input } from '@angular/core';
import { BlogService } from '../blog.service';
import {Post} from "../post.model";
import {Comment} from "../comment.model";
import { ActivatedRoute } from "@angular/router";
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
  post: Post;
  imageURL: string;
  constructor(private blogService: BlogService, private route: ActivatedRoute) { }

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
}
