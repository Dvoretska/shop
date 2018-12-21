import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-back-link',
  templateUrl: './back-link.component.html',
  styleUrls: ['./back-link.component.scss']
})
export class BackLinkComponent implements OnInit {
  @Input() path: string;
  constructor() { }

  ngOnInit() {
  }

}
