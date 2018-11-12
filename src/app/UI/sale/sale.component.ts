import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent implements OnInit {
  _ref:any;
  constructor() { }

  ngOnInit() {
  }

  onCloseAd() {
    this._ref.destroy();
    sessionStorage.setItem('adIsClosed', 'true')
  }
}
