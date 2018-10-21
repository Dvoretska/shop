import { Component, OnInit, Input } from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal/bs-modal-ref.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss']
})
export class CartModalComponent implements OnInit {
  @Input() currentProduct;
  @Input() size;
  @Input() quantity;
  imagePath: string;

  constructor(public modalRef: BsModalRef) { }

  ngOnInit() {
    this.imagePath = `${environment.API_URL}/${this.currentProduct.images[0]}`;
  }

}
