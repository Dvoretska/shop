import {Actions, Effect, ofType} from "@ngrx/effects";
import {Injectable} from "@angular/core";
import * as CartActions from '../actions/cart.actions';
import { switchMap, exhaustMap, map, catchError} from 'rxjs/operators';
import { of } from 'rxjs';
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';


@Injectable()
export class CartEffects {
  @Effect()
  addProductToCart = this.actions$
  .pipe(
    ofType(CartActions.ADD_PRODUCT_TO_CART),
    map((action: CartActions.AddProduct) => action.payload),
    exhaustMap((payload) =>
      this.http.post(`${environment.API_URL}/add-to-cart`, payload).pipe(
        map(()=>{
          return new CartActions.AddProductToCartSuccess();
        }),
        catchError(error => {
          return of(new CartActions.AddProductToCartFailure({error}));
        })
      )
    )
  );

  constructor(private actions$: Actions, private http: HttpClient) {

  }
}
