import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { Role } from '../role.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.components.scss']
})
export class UsersListComponent implements OnInit {
  users: User[];
  roles: Role[];
  errorMsg: string = '';
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(
      (res: {results: User[], meta: Role[]}) => {
        this.users = res.results;
        console.log(res)
        this.roles = res.meta;
      },
      (err) => {
        this.errorMsg = err.error;
      })
  }
}
