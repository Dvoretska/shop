import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.components.scss']
})
export class UsersListComponent implements OnInit {
  users: User[];
  roles: any[];
  errorMsg: string = '';
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(
      (res: {results: any[], meta: any[]}) => {
        console.log(res)
        this.users = res.results;
        this.roles = res.meta;
      },
      (err) => {
        this.errorMsg = err.error;
      })
  }
}
