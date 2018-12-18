import { Component, OnInit, Input, SimpleChanges, OnChanges,SimpleChange } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

export interface TreeNode {
  text: string;
  slug: string;
  value: number;
  showChildren: boolean;
  children: any[];
}

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit, OnChanges {
  @Input() treeData: TreeNode[];

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    const treeData: SimpleChange = changes.treeData;
    let category = this.route.snapshot.queryParamMap.get('category');
      if(category) {
        let index = treeData.currentValue.findIndex(x => x.slug == category);
        if(index != -1) {
          treeData.currentValue[index].showChildren = true;
        }
      }
  }

  toggleChild(node) {
    node.showChildren = !node.showChildren;
  }

}
