import { Component, OnInit } from '@angular/core';
import { TreeviewItem } from 'ngx-treeview';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit{
  config = {
    hasAllCheckBox: true,
    hasFilter: false,
    hasCollapseExpand: false,
    decoupleChildFromParent: false,
    maxHeight: 500
  };
  items = [{
    text: 'Vegetable', value: 2, children: [
      { text: 'Salad', value: 21 },
      { text: 'Potato', value: 22 }
    ]
  }];
  list = [];
  constructor() { }

  ngOnInit() {
    this.items.forEach(item => {
      this.list.push(new TreeviewItem(item))
    });
  }

}
