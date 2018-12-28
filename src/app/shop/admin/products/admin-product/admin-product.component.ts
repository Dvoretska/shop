import { Component, OnInit, Input } from '@angular/core';
import {environment} from "../../../../../environments/environment";

@Component({
  selector: '[app-admin-product]',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {
  @Input() product: any;
  imageUrl: string = 'src/assets/no-img.jpg';
  constructor() { }

  ngOnInit() {
    if(this.product && this.product.images) {
      this.imageUrl = `${environment.API_URL}/${this.product.images[0]}`;
    }
  }

}
