import {Actions, Effect, ofType} from "@ngrx/effects";
import {Injectable} from "@angular/core";
import * as CartActions from '../actions/cart.actions';
import * as ErrorsActions from '../actions/errors.actions';
import { exhaustMap, map, catchError} from 'rxjs/operators';
import { of, from } from 'rxjs';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { environment } from 'src/environments/environment';
import {ToastrService} from "ngx-toastr";


@Injectable()
export class CartEffects {

  constructor(private actions$: Actions, private http: HttpClient, private toastr: ToastrService) {}

  @Effect()
  addProductToCart = this.actions$
    .pipe(
      ofType(CartActions.ADD_PRODUCT_TO_CART),
      map((action: CartActions.AddProductToCart) => action.payload),
      exhaustMap((payload) =>
        this.http.post(`${environment.API_URL}/cart`, payload).pipe(
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
            return from([new ErrorsActions.LoadError(error), new CartActions.AddProductToCartFailure()]);
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
            return from([new ErrorsActions.LoadError(error), new CartActions.FetchCartFailure()]);
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
        return this.http.delete(`${environment.API_URL}/cart`, options).pipe(
          map((res) => {
            return new CartActions.DeleteProductFromCartSuccess({
              id: res['id'],
              totalNumberOfProducts: res['totalNumberOfProducts'],
              totalAmount: res['totalAmount']
            });
          }),
          catchError(error => {
            return from([new ErrorsActions.LoadError(error), new CartActions.DeleteProductFromCartFailure()]);
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
        return this.http.post(`${environment.API_URL}/cart/decrease`, {
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
            return from([new ErrorsActions.LoadError(error), new CartActions.DecreaseQuantityOfProductInCartFailure()]);
          })
        )
      }
    )
  );

  @Effect()
  getTotalNumberOfProducts = this.actions$
    .pipe(
      ofType(CartActions.GET_TOTAL_NUMBER_OF_PRODUCTS),
      exhaustMap(() =>
        this.http.get(`${environment.API_URL}/cart/number`).pipe(
          map((res)=>{
            return new CartActions.GetTotalNumberOfProductsSuccess({
              totalNumberOfProducts: res['totalNumberOfProducts']
            });
          }),
          catchError(error => of(new ErrorsActions.LoadError(error)))
        )
      )
    );

}
