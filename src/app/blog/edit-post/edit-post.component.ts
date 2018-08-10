import { Component, OnInit, Input } from '@angular/core';
import { BlogService } from '../blog.service';
import {Post} from "../post.model";
import {Comment} from "../comment.model";


@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  selectedPostId: number;
  // post: Post;
  // @Input() postSelected: Post;

  constructor(private blogService: BlogService) { }

  ngOnInit() {
      // console.log(this.postSelected)
    // getPostDetailsAct(id) {
    //   const self = this;
    //   this.blogService.getPostDetails(7).subscribe((post: Post) => {
    //     self.myPost = post;
    //     console.log(self.myPost)
    //   })
    // }
    //
    // this.blogService.postSelected.subscribe(
    //   (id: number) => {
    //     this.selectedPostId = id;
    //   }
    // )

  }

  // getPostDetails(id) {
  //   this.blogService.getPostDetails(id).subscribe(
  //     (res:{post: Post, comments: Comment[]}) => {
  //       console.log(res);
  //       this.post = res.post;
  //     },
  //     (err) => {
  //       console.log(err)
  //     })
  // }



}
