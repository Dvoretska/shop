import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'my-project';
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    if (environment.production) {
     if (location.protocol === 'http:') {
      window.location.href = location.href.replace('http', 'https');
     }
    }
  }
}
