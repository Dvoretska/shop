import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  myRole: string;
  user: any;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    if(this.authService.getUser()) {
      this.user = this.authService.getUser();
      this.myRole = this.user.role;
    }
  }

}
