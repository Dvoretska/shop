import { Component, OnInit, Input, HostListener } from '@angular/core';
import { User } from '../../user.model';
import { Role } from '../../role.model';
import { UserService } from '../../user.service';

@Component({
  selector: '[app-user]',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input() user: User[];
  @Input() roles: Role[];
  imagePath: string;
  API_URL = 'http://localhost:3000';
  selectedValue: string = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.imagePath = `${this.API_URL}/${this.user['image']}`
    this.selectedValue = this.user['role_id']['role'];
  }

  onSelectUser() {
    this.userService.userSelected.emit(this.user);
  }

}
