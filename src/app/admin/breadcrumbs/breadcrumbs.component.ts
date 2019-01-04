import { Component, OnInit } from '@angular/core';
import {filter} from "rxjs/operators";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  displayBreadcrumbList: any[];
  routerUrl: string;
  initialUrl: string;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.listenRouting();
  }

  ngOnInit() {
  }

  listenRouting() {
    let masterBreadcrumbList;
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.displayBreadcrumbList = [];
      this.routerUrl = location.pathname;
      masterBreadcrumbList = this.routerUrl.slice(1).split('/');
      for (let i = 0; i < masterBreadcrumbList.length; i++) {
        if (i !== 0) {
          this.initialUrl = this.displayBreadcrumbList[i - 1].url + '/';
        } else {
          this.initialUrl = '/';
        }
        let breadCrumbObj;
        if(i < 1) {
          breadCrumbObj = {
            url: this.initialUrl + masterBreadcrumbList[i],
            id: i
          };
        } else {
          breadCrumbObj = {
            name:masterBreadcrumbList[i],
            url: this.initialUrl + masterBreadcrumbList[i],
            id: i
          };
        }
        this.displayBreadcrumbList.push(breadCrumbObj);
      }
    });
  }
}
