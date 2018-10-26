import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from "@angular/router";
import * as cartActions from "../../store/actions/cart.actions";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../store/reducers/reducer.factory";


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product: any;
  imageUrl: string;
  defaultImageUrl: string = 'src/assets/no-img.jpg';

  constructor(private router: Router, private store: Store<fromRoot.AppState>) { }

  ngOnInit() {
    if(this.product && this.product.images) {
      this.imageUrl = `${environment.API_URL}/${this.product.images[0]}`;
    } else {
      this.imageUrl = this.defaultImageUrl;
    }
  }

  openProductDetails() {
    this.router.navigate(['shop', this.product.id]);
  }
}
