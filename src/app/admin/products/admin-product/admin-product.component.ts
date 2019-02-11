import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: '[app-admin-product]',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {
  @Input() product: any;
  imageUrl: string = '../../../../assets/no-img.jpg';
  constructor(private router: Router, private route:ActivatedRoute) { }

  ngOnInit() {
    if(this.product && this.product.images) {
      this.imageUrl = this.product.images[0];
    }
  }

  changeQuantity() {
    this.router.navigate([this.product.id, 'quantity'], {relativeTo:this.route});
  }

}
