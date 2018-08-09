import { Component, OnInit, Input } from '@angular/core';
import { BlogService } from '../blog.service';
import { Post } from '../post.model';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts: Post[];
  postsIds: number[];
  constructor(private blogService: BlogService) { }

  ngOnInit() {
    this.blogService.getPosts().subscribe(
      (res: {posts: Post[], meta: number[]}) => {
        console.log(res);
        this.posts = res['posts'];
        this.postsIds = res['meta'];
      },
      (err) => {
        console.log(err)
      })
  }

}
