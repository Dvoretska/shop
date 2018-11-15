import { Action } from '@ngrx/store';
import { OrderForm } from "../../models/orderForm.model";

export const SAVE_ORDER = 'SAVE_ORDER';
export const SAVE_ORDER_SUCCESS = 'SAVE_ORDER_SUCCESS';
export const SAVE_ORDER_FAILURE = 'SAVE_ORDER_FAILURE';

export const FETCH_ORDER = 'FETCH_ORDER';
export const FETCH_ORDER_SUCCESS = 'FETCH_ORDER_SUCCESS';
export const FETCH_ORDER_FAILURE = 'FETCH_ORDER_FAILURE';


export class SaveOrder implements Action {
  readonly type = SAVE_ORDER;

  constructor(public payload: {savedData: FormData}) {}
}

export class SaveOrderSuccess implements Action {
  readonly type = SAVE_ORDER_SUCCESS;

  constructor(public payload: {order_number: number}) {}
}

export class SaveOrderFailure implements Action {
  readonly type = SAVE_ORDER_FAILURE;

  constructor() {}
}

export class FetchOrder implements Action {
  readonly type = FETCH_ORDER;

  constructor(public payload: {order_number: number}) {}
}

export class FetchOrderSuccess implements Action {
  readonly type = FETCH_ORDER_SUCCESS;

  constructor(public payload: {order_info: any, order: any, order_person: any, totalAmount: number}) {}
}

export class FetchOrderFailure implements Action {
  readonly type = FETCH_ORDER_FAILURE;

  constructor() {}
}

export type orderActions =
  SaveOrder |
  SaveOrderSuccess |
  SaveOrderFailure |
  FetchOrder |
  FetchOrderSuccess |
  FetchOrderFailure;
