import { Action } from '@ngrx/store';

export const SAVE_ORDER = 'SAVE_ORDER';
export const SAVE_ORDER_SUCCESS = 'SAVE_ORDER_SUCCESS';

export const FETCH_ORDER = 'FETCH_ORDER';
export const FETCH_ORDER_SUCCESS = 'FETCH_ORDER_SUCCESS';

export const FETCH_ORDERS = 'FETCH_ORDERS';
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';


export class SaveOrder implements Action {
  readonly type = SAVE_ORDER;

  constructor(public payload: {savedData: FormData}) {}
}

export class SaveOrderSuccess implements Action {
  readonly type = SAVE_ORDER_SUCCESS;

  constructor(public payload: {order_number: number}) {}
}

// _____________________________________________________

export class FetchOrder implements Action {
  readonly type = FETCH_ORDER;

  constructor(public payload: {order_number: number}) {}
}

export class FetchOrderSuccess implements Action {
  readonly type = FETCH_ORDER_SUCCESS;

  constructor(public payload: {order: any}) {}
}

// _____________________________________________________

export class FetchOrders implements Action {
  readonly type = FETCH_ORDERS;

  constructor() {}
}

export class FetchOrdersSuccess implements Action {
  readonly type = FETCH_ORDERS_SUCCESS;

  constructor(public payload: {orders: any[]}) {}
}

// _____________________________________________________

export type orderActions =
  SaveOrder |
  SaveOrderSuccess |
  FetchOrder |
  FetchOrderSuccess |
  FetchOrders |
  FetchOrdersSuccess;
