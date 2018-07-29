import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: User[];
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(
      (res: User[]) => {
      console.log(res)
        this.users = res;
      },
      (err) => {
        console.log(err)
      })
  }

}
