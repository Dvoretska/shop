import {Actions, Effect, ofType} from "@ngrx/effects";
import {Injectable} from "@angular/core";
import * as ProductsActions from '../actions/products.actions';
import { switchMap, exhaustMap, map, catchError} from 'rxjs/operators';
import { of } from 'rxjs';
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';


@Injectable()
export class ProductsEffects {
  @Effect()
  addProduct = this.actions$
  .pipe(
    ofType(ProductsActions.ADD_PRODUCT),
    map((action: ProductsActions.AddProduct) => action.payload),
    switchMap((payload) =>
      this.http.post(`${environment.API_URL}/create-product`, payload).pipe(
        map((product)=>{
          return new ProductsActions.AddProductSuccess({product});
        }),
        catchError(error => {
          return of(new ProductsActions.AddProductFailure({error}));
        })
      )
    )
  );

  @Effect()
  fetchCategories = this.actions$
    .pipe(
      ofType(ProductsActions.FETCH_CATEGORIES),
      switchMap(() =>
        this.http.get(`${environment.API_URL}/categories`).pipe(
          map((categories)=>{
            return new ProductsActions.FetchCategoriesSuccess({categories});
          }),
          catchError(error => {
            return of(new ProductsActions.FetchCategoriesFailure({error}));
          })
        )
      )
    );

  @Effect()
  fetchProducts = this.actions$
    .pipe(
      ofType(ProductsActions.FETCH_PRODUCTS),
      map((action: ProductsActions.FetchProducts) => action.payload),
      switchMap((payload) =>
        this.http.get(`${environment.API_URL}/products/${payload.queryString}`).pipe(
          map((res)=>{
            return new ProductsActions.FetchProductsSuccess({products: res['products'], totalAmount: res['totalAmount']});
          }),
          catchError(error => {
            return of(new ProductsActions.FetchProductsFailure({error}));
          })
        )
      )
    );

  @Effect()
  fetchProductsInit = this.actions$
    .pipe(
      ofType(ProductsActions.FETCH_PRODUCTS_INIT),
      map((action: ProductsActions.FetchProductsInit) => action.payload),
      switchMap((payload) =>
        this.http.get(`${environment.API_URL}/products/${payload}`).pipe(
          map((res)=>{
            return new ProductsActions.FetchProductsInitSuccess({products: res['products'], totalAmount: res['totalAmount']});
          }),
          catchError(error => {
            return of(new ProductsActions.FetchProductsInitFailure({error}));
          })
        )
      )
    );

  @Effect()
  fetchProductDetails = this.actions$
    .pipe(
      ofType(ProductsActions.FETCH_PRODUCT_DETAILS),
      map((action: ProductsActions.FetchProductDetails) => action.payload),
      switchMap((payload) =>
        this.http.get(`${environment.API_URL}/product/${payload}`).pipe(
          map((res)=>{
            return new ProductsActions.FetchProductDetailsSuccess({product: res});
          }),
          catchError(error => {
            return of(new ProductsActions.FetchProductDetailsFailure({error}));
          })
        )
      )
    );

  constructor(private actions$: Actions, private http: HttpClient) {

  }
}
