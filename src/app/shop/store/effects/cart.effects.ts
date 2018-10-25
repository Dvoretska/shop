import {Actions, Effect, ofType} from "@ngrx/effects";
import {Injectable} from "@angular/core";
import * as CartActions from '../actions/cart.actions';
import { exhaustMap, map, catchError} from 'rxjs/operators';
import { of } from 'rxjs';
import {HttpClient, HttpHeaders} from "@angular/common/http";
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
            return new CartActions.AddProductToCartSuccess({
              quantity: res['productQty'].quantity,
              amount: res['amount'],
              product: res['product'],
              totalAmount: res['totalAmount'],
              totalNumberOfProducts: res['totalNumberOfProducts']
            });
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
            return new CartActions.FetchCartSuccess({
              cart: res['cart'],
              totalNumberOfProducts: res['totalNumberOfProducts'],
              totalAmount: res['totalAmount']
            });
          }),
          catchError(error => {
            return of(new CartActions.FetchCartFailure({error}));
          })
        )
      )
    );

  @Effect()
  deleteProductFromCart = this.actions$
    .pipe(
      ofType(CartActions.DELETE_PRODUCT_FROM_CART),
      map((action: CartActions.DeleteProductFromCart) => action.payload),
      exhaustMap((payload)=> {
        let options = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
          body: payload,
        };
        return this.http.delete(`${environment.API_URL}/delete-from-cart`, options).pipe(
          map((res) => {
            return new CartActions.DeleteProductFromCartSuccess({
              product_id: res['product_id'],
              size: res['size'],
              totalNumberOfProducts: res['totalNumberOfProducts'],
              totalAmount: res['totalAmount']
            });
          }),
          catchError(error => {
            return of(new CartActions.DeleteProductFromCartFailure({error}));
          })
        )
      }
    )
  );

  @Effect()
  decreaseQuantityOfProductInCart = this.actions$
    .pipe(
      ofType(CartActions.DECREASE_QUANTITY_OF_PRODUCT_IN_CART),
      map((action: CartActions.DecreaseQuantityOfProductInCart) => action.payload),
      exhaustMap((payload)=> {
        return this.http.post(`${environment.API_URL}/update-cart`, {
          product_id: payload.product_id,
          size: payload.size
        }).pipe(
          map((res) => {
            return new CartActions.DecreaseQuantityOfProductInCartSuccess({
              quantity: res['productQty'].quantity,
              amount: res['amount'],
              product: res['product'],
              totalAmount: res['totalAmount'],
              totalNumberOfProducts: res['totalNumberOfProducts']
            });
          }),
          catchError(error => {
            return of(new CartActions.DecreaseQuantityOfProductInCartFailure({error}));
          })
        )
      }
    )
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
