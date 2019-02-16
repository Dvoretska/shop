import {Actions, Effect, ofType} from "@ngrx/effects";
import {Injectable} from "@angular/core";
import * as OrderActions from '../actions/order.actions';
import * as ErrorsActions from '../actions/errors.actions';
import { exhaustMap, map, catchError} from 'rxjs/operators';
import { of, from } from 'rxjs';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { environment } from 'src/environments/environment';


@Injectable()
export class OrderEffects {

  constructor(private actions$: Actions, private http: HttpClient) {}

  @Effect()
  saveOrder = this.actions$
    .pipe(
      ofType(OrderActions.SAVE_ORDER),
      map((action: OrderActions.SaveOrder) => action.payload),
      exhaustMap((payload) =>
        this.http.post(`${environment.API_URL}/create-order`, payload.savedData).pipe(
          map((res)=>{
            return new OrderActions.SaveOrderSuccess({
             order_number: res['order_number']
            });
          }),
          catchError(error => {
            return from([new ErrorsActions.LoadError(error)]);
          })
        )
      )
    );

  @Effect()
  getOrder = this.actions$
    .pipe(
      ofType(OrderActions.FETCH_ORDER),
      map((action: OrderActions.FetchOrder) => action.payload),
      exhaustMap((payload) =>
        this.http.get(`${environment.API_URL}/order/${payload.order_number}`).pipe(
          map((res)=>{
            return new OrderActions.FetchOrderSuccess({
             order_info: res['order_info'],
             order: res['order'],
             order_person: res['order_person']
            });
          }),
          catchError(error => {
            return from([new ErrorsActions.LoadError(error),
              new OrderActions.FetchOrderFailure()]);
          })
        )
      )
    );

  @Effect()
  getOrders = this.actions$
    .pipe(
      ofType(OrderActions.FETCH_ORDERS),
      exhaustMap((payload) =>
        this.http.get(`${environment.API_URL}/orders`).pipe(
          map((res)=>{
            return new OrderActions.FetchOrdersSuccess({
              orders: res['orders']
            });
          }),
          catchError(error => {
            return from([new ErrorsActions.LoadError(error),
              new OrderActions.FetchOrdersFailure()]);
          })
        )
      )
    );
}
