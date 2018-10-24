import {Actions, Effect, ofType} from "@ngrx/effects";
import {Injectable} from "@angular/core";
import * as CartActions from '../actions/cart.actions';
import { exhaustMap, map, catchError} from 'rxjs/operators';
import { of } from 'rxjs';
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';


@Injectable()
export class CartEffects {
  @Effect()
  addProductToCart = this.actions$
    .pipe(
      ofType(CartActions.ADD_PRODUCT_TO_CART),
      map((action: CartActions.AddProductToCart) => action.payload),
      exhaustMap((payload) =>
        this.http.post(`${environment.API_URL}/add-to-cart`, payload.cart).pipe(
          map((res)=>{
            return new CartActions.AddProductToCartSuccess({quantity: res['productQty'].quantity, amount: res['amount']});
          }),
          catchError(error => {
            return of(new CartActions.AddProductToCartFailure({error}));
          })
        )
      )
    );

  @Effect()
  fetchCart = this.actions$
    .pipe(
      ofType(CartActions.FETCH_CART),
      exhaustMap(() =>
        this.http.get(`${environment.API_URL}/cart`).pipe(
          map((res)=>{
            return new CartActions.FetchCartSuccess(res);
          }),
          catchError(error => {
            return of(new CartActions.FetchCartFailure({error}));
          })
        )
      )
    );

  @Effect()
  getTotalAmount = this.actions$
    .pipe(
      ofType(CartActions.GET_TOTAL_AMOUNT),
      exhaustMap(() =>
        this.http.get(`${environment.API_URL}/amount`).pipe(
          map((res)=>{
            return new CartActions.GetTotalAmountSuccess({totalAmount: res['totalAmount']});
          }),
          catchError(error => {
            return of(new CartActions.GetTotalAmountFailure({error}));
          })
        )
      )
    );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
