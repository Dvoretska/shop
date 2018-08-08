import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  myRole: string;

  constructor() { }

  ngOnInit() {
    this.myRole = JSON.parse(localStorage.getItem('user')).role;
  }

}
