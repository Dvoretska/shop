import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-order-svg',
  templateUrl: './order-svg.component.html',
  styleUrls: ['./order-svg.component.scss']
})
export class OrderSvgComponent implements OnInit {
  @Output() onClick = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  onChangeOrder(event) {
    this.onClick.emit(event);
  }

}
