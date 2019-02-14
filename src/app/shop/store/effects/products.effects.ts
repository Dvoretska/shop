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
  updateSizesQuantity = this.actions$
  .pipe(
    ofType(ProductsActions.UPDATE_SIZES_QUANTITY),
    map((action: ProductsActions.UpdateSizesQuantity) => action.payload),
    switchMap((payload) =>
      this.http.post(`${environment.API_URL}/product/quantity/update`, payload.savedData).pipe(
        map(()=>{
          payload.callback.success('Your changes were successfully saved');
          return new ProductsActions.UpdateSizesQuantitySuccess();
        }),
        catchError(error => {
          return from([new ErrorsActions.LoadError(error)]);
        })
      )
    )
  );

  @Effect()
  getSizes = this.actions$
  .pipe(
    ofType(ProductsActions.GET_SIZES),
    switchMap(() =>
      this.http.get(`${environment.API_URL}/sizes`).pipe(
        map((res)=>{
          return new ProductsActions.GetSizesSuccess({'sizes': res});
        }),
        catchError(error => {
          return from([new ErrorsActions.LoadError(error)]);
        })
      )
    )
  );

  @Effect()
  getAvailableSizes = this.actions$
  .pipe(
    ofType(ProductsActions.GET_AVAILABLE_SIZES),
    map((action: ProductsActions.GetAvailableSizes) => action.payload),
    switchMap((payload) =>
      this.http.get(`${environment.API_URL}/sizes/available/${payload}`).pipe(
        map((res)=>{
          return new ProductsActions.GetAvailableSizesSuccess({'availableSizes': res['availableSizes']});
        }),
        catchError(error => {
          return from([new ErrorsActions.LoadError(error)]);
        })
      )
    )
  );

  @Effect()
  addQuantityToStock = this.actions$
  .pipe(
    ofType(ProductsActions.ADD_QUANTITY_TO_STOCK),
    map((action: ProductsActions.AddQuantityToStock) => action.payload),
    switchMap((payload) =>
      this.http.post(`${environment.API_URL}/stock/add`,
        {size_id: payload.size_id, product_id: payload.product_id, quantity: payload.quantity}
      ).pipe(
        map(()=>{
          payload.showToast.success('Your changes were successfully saved');
          return new ProductsActions.AddQuantityToStockSuccess();
        }),
        catchError(error => {
          return from([new ErrorsActions.LoadError(error)]);
        })
      )
    )
  );

  @Effect()
  deleteSizes = this.actions$
  .pipe(
    ofType(ProductsActions.DELETE_SIZES),
    map((action: ProductsActions.DeleteSizes) => action.payload),
    exhaustMap((payload)=> {
      let options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        body: payload
      };
      return this.http.delete(`${environment.API_URL}/sizes/delete`, options).pipe(
        map(() => {
          return new ProductsActions.GetSizes();
        }),
        catchError(error => {
          return from([new ErrorsActions.LoadError(error)]);
        })
      )
    })
  );

  @Effect()
  addSize = this.actions$
  .pipe(
    ofType(ProductsActions.ADD_SIZE),
    map((action: ProductsActions.AddSize) => action.payload),
    switchMap((payload) =>
      this.http.post(`${environment.API_URL}/sizes/add`,
        {size: payload.size}
      ).pipe(
        map(()=>{
          payload.showToast.success('The size was successfully added');
          payload.clearFields();
          return new ProductsActions.AddSizeSuccess();
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
          return from([new ErrorsActions.LoadError(error)]);
        })
      )
    )
  );

  constructor(private actions$: Actions, private http: HttpClient) {

  }
}
