import {Actions, Effect, ofType} from "@ngrx/effects";
import {Injectable} from "@angular/core";
import * as ShopActions from './shop.actions'
import { concatMap, map, catchError} from 'rxjs/operators';
import { of } from 'rxjs';
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable()
export class ShopEffects {
  @Effect()
  addProduct = this.actions$
  .pipe(
    ofType(ShopActions.ADD_PRODUCT),
    map((action: ShopActions.AddProduct) => action.payload),
    concatMap((payload) =>
      this.http.post(`${environment.API_URL}/create-product`, payload)
    ),
    map((product)=>{
      return new ShopActions.AddProductSuccess({product});
    }),
    catchError(error => {
      return of(new ShopActions.AddProductFailure({error}));
    })
  );

  @Effect()
  // fetchCategories = this.actions$
  //   .pipe(
  //     ofType(ShopActions.ADD_PRODUCT),
  //     map((action: ShopActions.AddProduct) => action.payload),
  //     concatMap((payload) =>
  //       this.http.post(`${environment.API_URL}/create-product`, payload)
  //     ),
  //     map((product)=>{
  //       return new ShopActions.AddProductSuccess({product});
  //     }),
  //     catchError(error => {
  //       return of(new ShopActions.AddProductFailure({error}));
  //     })
  //   );

  constructor(private actions$: Actions, private http: HttpClient) {

  }
}
