import {Component, OnInit, Input} from '@angular/core';
import { Router } from "@angular/router";
import * as wishlistActions from "../../store/actions/wishlist.actions";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../store/reducers/reducer.factory";
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product: any;
  @Input() wishlist: any[];
  imageUrl: string;
  defaultImageUrl: string = 'src/assets/no-img.jpg';

  constructor(private router: Router, private store: Store<fromRoot.AppState>, private route:ActivatedRoute) { }

  ngOnInit() {
    if(this.product && this.product.images) {
      this.imageUrl = this.product.images[0];
    } else {
      this.imageUrl = this.defaultImageUrl;
    }
  }

  openProductDetails() {
    this.router.navigate([this.product.id], {relativeTo:this.route, queryParamsHandling: 'preserve' });
  }

  handleWishlist(id) {
    if(this.checkIfProductInWishlist(id)) {
      this.store.dispatch(new wishlistActions.DeleteProductFromWishlist({
        product_id: this.product['id']
      }));
    } else {
      this.store.dispatch(new wishlistActions.AddProductToWishlist({
        product_id: this.product['id']
      }));
    }
  }

  checkIfProductInWishlist(id) {
    return this.wishlist.some(obj => obj.product_id == id)
  }
}
