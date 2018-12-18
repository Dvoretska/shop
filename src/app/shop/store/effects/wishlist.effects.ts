import {Actions, Effect, ofType} from "@ngrx/effects";
import {Injectable} from "@angular/core";
import * as WishlistActions from '../actions/wishlist.actions';
import * as ErrorsActions from '../actions/errors.actions';
import { exhaustMap, map, catchError, switchMap} from 'rxjs/operators';
import {from, of} from 'rxjs';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { environment } from 'src/environments/environment';
import * as CartActions from "../actions/cart.actions";
import {GET_TOTAL_NUM_OF_PRODUCTS_IN_WISHLIST} from "../actions/wishlist.actions";


@Injectable()
export class WishlistEffects {

  constructor(private actions$: Actions, private http: HttpClient) {}

  @Effect()
  fetchWishlist = this.actions$
    .pipe(
      ofType(WishlistActions.FETCH_WISHLIST),
      exhaustMap(() =>
        this.http.get(`${environment.API_URL}/wishlist`).pipe(
          map((res)=>{
            return new WishlistActions.FetchWishlistSuccess({
              wishlist: res['wishlist'],
              totalNumOfProductsInWishlist: res['totalNumOfProductsInWishlist'],
            });
          }),
          catchError(error => {
            return from([new ErrorsActions.LoadError(error), new WishlistActions.FetchWishlistFailure()]);
          })
        )
      )
    );

  @Effect()
  addProductToWishlist = this.actions$
    .pipe(
      ofType(WishlistActions.ADD_PRODUCT_TO_WISHLIST),
      map((action: WishlistActions.AddProductToWishlist) => action.payload),
      exhaustMap((payload) =>
        this.http.post(`${environment.API_URL}/add-to-wishlist`, payload).pipe(
          map((res)=>{
            return new WishlistActions.AddProductToWishlistSuccess({
             item: res['item'],
             totalNumOfProductsInWishlist: res['count'].count
            });
          }),
          catchError(error => {
            return from([new ErrorsActions.LoadError(error), new WishlistActions.AddProductToWishlistFailure()]);
          })
        )
      )
    );

  @Effect()
  deleteProductFromWishlist = this.actions$
    .pipe(
      ofType(WishlistActions.DELETE_PRODUCT_FROM_WISHLIST),
      map((action: WishlistActions.DeleteProductFromWishlist) => action.payload),
      exhaustMap((payload)=> {
        let options = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
          body: payload,
        };
        return this.http.delete(`${environment.API_URL}/delete-from-wishlist`, options).pipe(
          map((res) => {
            return new WishlistActions.DeleteProductFromWishlistSuccess({
              product_id: res['product_id'],
              totalNumOfProductsInWishlist: res['count'][0].count
            });
          }),
          catchError(error => {
            return from([new ErrorsActions.LoadError(error), new WishlistActions.DeleteProductFromWishlistFailure()]);
          })
        )
      }
    )
  );

  @Effect()
  getTotalNumOfProductsInWishlist = this.actions$
    .pipe(
      ofType(WishlistActions.GET_TOTAL_NUM_OF_PRODUCTS_IN_WISHLIST),
      exhaustMap(() =>
        this.http.get(`${environment.API_URL}/number-wishlist`).pipe(
          map((res)=>{
            return new WishlistActions.GetTotalNumOfProductsInWishlistSuccess({
              totalNumOfProductsInWishlist: res['total']
            });
          }),
          catchError(error => of(new WishlistActions.GetTotalNumOfProductsInWishlistFailure()))
        )
      )
    );
}
