import { Component, OnInit } from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal/bs-modal-ref.service";

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss']
})
export class CartModalComponent implements OnInit {

  constructor(public modalRef: BsModalRef) { }

  ngOnInit() {
  }

}
