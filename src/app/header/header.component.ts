import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  myRole: string;
  constructor() { }

  ngOnInit() {
    this.myRole = JSON.parse(localStorage.getItem('user')).role;
  }

}
