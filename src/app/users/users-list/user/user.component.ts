import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../user.model';

@Component({
  selector: '[app-user]',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input() user: User[];
  @Input() roles: any[];
  selectedValue: string = '';
  constructor() { }

  ngOnInit() {
    this.selectedValue = this.user.role_id.role;
  }

}
