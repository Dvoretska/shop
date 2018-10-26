import {Actions, Effect, ofType} from "@ngrx/effects";
import {Injectable} from "@angular/core";
import * as CartActions from '../actions/cart.actions';
import { exhaustMap, map, catchError, switchMap} from 'rxjs/operators';
import { of, from } from 'rxjs';
import {HttpClient, HttpHeaders, HttpErrorResponse} from "@angular/common/http";
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
            return from([new CartActions.LoadError(error), new CartActions.AddProductToCartFailure()]);
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
            return from([new CartActions.LoadError(error), new CartActions.FetchCartFailure()]);
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
            return from([new CartActions.LoadError(error), new CartActions.DeleteProductFromCartFailure()]);
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
            return from([new CartActions.LoadError(error), new CartActions.DecreaseQuantityOfProductInCartFailure()]);
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
        this.http.get(`${environment.API_URL}/number-products`).pipe(
          map((res)=>{
            return new CartActions.GetTotalNumberOfProductsSuccess({
              totalNumberOfProducts: res['totalNumberOfProducts']
            });
          }),
          catchError(error => of(new CartActions.LoadError(error)))
        )
      )
    );

  @Effect()
  onLoadError = this.actions$
    .pipe(
      ofType(CartActions.EFFECT_ERROR),
      map((action: CartActions.LoadError) => action.payload),
      switchMap((payload) => {
        let error = payload;
        if (error instanceof HttpErrorResponse) {
          // Server or connection error happened
          if (!navigator.onLine) {
            // Handle offline error
            this.toastr.error('No Internet Connection.');
          } else if(error.status == 0) {
            this.toastr.error('Something went wrong. Try again later.');
          } else {
            // Handle Http Error (error.status === 403, 404...)
            this.toastr.error(`${error.status} - ${error.statusText}`);
          }
        }
        return of();
      })
    )

}
