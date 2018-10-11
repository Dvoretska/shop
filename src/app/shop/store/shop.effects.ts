import {Actions, Effect, ofType} from "@ngrx/effects";
import {Injectable} from "@angular/core";
import * as ShopActions from './shop.actions'
import { switchMap, concatMap, map, catchError} from 'rxjs/operators';
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
    switchMap((payload) =>
      this.http.post(`${environment.API_URL}/create-product`, payload).pipe(
        map((product)=>{
          return new ShopActions.AddProductSuccess({product});
        }),
        catchError(error => {
          return of(new ShopActions.AddProductFailure({error}));
        })
      )
    )
  );

  @Effect()
  fetchCategories = this.actions$
    .pipe(
      ofType(ShopActions.FETCH_CATEGORIES),
      switchMap(() =>
        this.http.get(`${environment.API_URL}/categories`).pipe(
          map((categories)=>{
            return new ShopActions.FetchCategoriesSuccess({categories});
          }),
          catchError(error => {
            return of(new ShopActions.FetchCategoriesFailure({error}));
          })
        )
      )
    );

  constructor(private actions$: Actions, private http: HttpClient) {

  }
}
