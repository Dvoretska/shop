import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService]
})
export class UsersComponent implements OnInit {
  selectedUser: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.userSelected
      .subscribe(
        (user: User) => {
          this.selectedUser = user
        }
      )
  }

}
