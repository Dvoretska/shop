import {Actions, Effect, ofType} from "@ngrx/effects";
import {Injectable} from "@angular/core";
import * as ProductsActions from '../actions/products.actions';
import * as ErrorsActions from '../actions/errors.actions';
import { switchMap, map, catchError} from 'rxjs/operators';
import {from} from 'rxjs';
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
      this.http.post(`${environment.API_URL}/product`, payload).pipe(
        map((product)=>{
          return new ProductsActions.AddProductSuccess({product});
        }),
        catchError(error => {
          return from([new ErrorsActions.LoadError(error), new ProductsActions.AddProductFailure()]);
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
            return from([new ErrorsActions.LoadError(error)]);
          })
        )
      )
    );

  @Effect()
  fetchSubcategories = this.actions$
    .pipe(
      ofType(ProductsActions.FETCH_SUBCATEGORIES),
      map((action: ProductsActions.FetchSubcategories) => action.payload),
      switchMap((payload) =>
        this.http.get(`${environment.API_URL}/subcategories/${payload.category_id}`).pipe(
          map((subcategories)=>{
            return new ProductsActions.FetchSubcategoriesSuccess({subcategories});
          }),
          catchError(error => {
            return from([new ErrorsActions.LoadError(error)]);
          })
        )
      )
    );

  @Effect()
  fetchCategoriesTree = this.actions$
    .pipe(
      ofType(ProductsActions.FETCH_CATEGORIES_TREE),
      switchMap(() =>
        this.http.get(`${environment.API_URL}/categories-tree`).pipe(
          map((res)=>{
            return new ProductsActions.FetchCategoriesTreeSuccess({categoriesTree: res['categoriesTree']});
          }),
          catchError(error => {
            return from([new ErrorsActions.LoadError(error)]);
          })
        )
      )
    );

  @Effect()
  fetchProducts = this.actions$
    .pipe(
      ofType(ProductsActions.FETCH_PRODUCTS, ProductsActions.FETCH_PRODUCTS_INIT),
      map((action: ProductsActions.FetchProducts) => action.payload),
      switchMap((payload) =>
        this.http.get(`${environment.API_URL}/products/${payload}`).pipe(
          map((res)=>{
            return new ProductsActions.FetchProductsSuccess({products: res['products'], totalAmount: res['totalAmount']});
          }),
          catchError(error => {
            return from([new ErrorsActions.LoadError(error), new ProductsActions.FetchProductsFailure()]);
          })
        )
      )
    );

  @Effect()
  fetchProductsBySearch = this.actions$
    .pipe(
      ofType(ProductsActions.FETCH_PRODUCTS_BY_SEARCH, ProductsActions.FETCH_PRODUCTS_BY_SEARCH_INIT),
      map((action: ProductsActions.FetchProductsBySearch) => action.payload),
      switchMap((payload) =>
        this.http.get(`${environment.API_URL}/products/search${payload}`).pipe(
          map((res)=>{
            return new ProductsActions.FetchProductsBySearchSuccess({products: res['products'], totalAmount: res['totalAmount']});
          }),
          catchError(error => {
            return from([new ErrorsActions.LoadError(error), new ProductsActions.FetchProductsBySearchFailure()]);
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
            return from([new ErrorsActions.LoadError(error), new ProductsActions.FetchProductDetailsFailure()]);
          })
        )
      )
    );

  constructor(private actions$: Actions, private http: HttpClient) {

  }
}
