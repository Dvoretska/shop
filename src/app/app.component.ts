import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-project';
  constructor(private router: Router, private route: ActivatedRoute) {}

  ifAdminRouter() {
    return /^\/admin/g.test(location.pathname)
  }
}
