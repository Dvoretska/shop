import {Actions, Effect, ofType} from "@ngrx/effects";
import {Injectable} from "@angular/core";
import * as ProductsActions from '../actions/products.actions';
import * as ErrorsActions from '../actions/errors.actions';
import {switchMap, map, catchError, exhaustMap} from 'rxjs/operators';
import {from} from 'rxjs';
import {HttpClient, HttpHeaders} from "@angular/common/http";
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
        map((res)=>{
          return new ProductsActions.AddProductSuccess({product_id: res['product_id']});
        }),
        catchError(error => {
          return from([new ErrorsActions.LoadError(error), new ProductsActions.AddProductFailure()]);
        })
      )
    )
  );

  @Effect()
  updateProduct = this.actions$
  .pipe(
    ofType(ProductsActions.UPDATE_PRODUCT),
    map((action: ProductsActions.UpdateProduct) => action.payload),
    switchMap((payload) =>
      this.http.post(`${environment.API_URL}/product/update`, payload).pipe(
        map((res)=>{
          return new ProductsActions.UpdateProductSuccess({product_id: res['product_id']});
        }),
        catchError(error => {
          return from([new ErrorsActions.LoadError(error)]);
        })
      )
    )
  );

  @Effect()
  deleteProduct = this.actions$
  .pipe(
    ofType(ProductsActions.DELETE_PRODUCT),
    map((action: ProductsActions.DeleteProduct) => action.payload.product_id),
    exhaustMap((payload)=> {
      console.log(payload)
      let options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        body: {product_id: payload}
      };
      return this.http.delete(`${environment.API_URL}/product/delete`, options).pipe(
        map(() => {
          return new ProductsActions.DeleteProductSuccess();
        }),
        catchError(error => {
          return from([new ErrorsActions.LoadError(error)]);
        })
      )
    })
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
  fetchProductsFromStock = this.actions$
  .pipe(
    ofType(ProductsActions.FETCH_PRODUCTS_FROM_STOCK),
    map((action: ProductsActions.FetchProductsFromStock) => action.payload),
    switchMap((payload) =>
      this.http.get(`${environment.API_URL}/stock-products/${payload}`).pipe(
        map((res)=>{
          return new ProductsActions.FetchProductsFromStockSuccess({'productsFromStock': res['products'], 'totalAmount': res['totalAmount']});
        }),
        catchError(error => {
          return from([new ErrorsActions.LoadError(error)]);
        })
      )
    )
  );

  @Effect()
  fetchSizesQuantity = this.actions$
  .pipe(
    ofType(ProductsActions.FETCH_SIZES_QUANTITY),
    map((action: ProductsActions.FetchSizesQuantity) => action.payload),
    switchMap((payload) =>
      this.http.get(`${environment.API_URL}/product/quantity/${payload}`).pipe(
        map((res)=>{
          return new ProductsActions.FetchSizesQuantitySuccess({'sizesQuantity': res['result']});
        }),
        catchError(error => {
          return from([new ErrorsActions.LoadError(error)]);
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
