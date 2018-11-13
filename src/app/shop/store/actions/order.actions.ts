import { Action } from '@ngrx/store';
import { OrderForm } from "../../models/orderForm.model";

export const SAVE_ORDER = 'SAVE_ORDER';
export const SAVE_ORDER_SUCCESS = 'SAVE_ORDER_SUCCESS';
export const SAVE_ORDER_FAILURE = 'SAVE_ORDER_FAILURE';


export class SaveOrder implements Action {
  readonly type = SAVE_ORDER;

  constructor(public payload: OrderForm) {}
}

export class SaveOrderSuccess implements Action {
  readonly type = SAVE_ORDER_SUCCESS;

  constructor() {}
}

export class SaveOrderFailure implements Action {
  readonly type = SAVE_ORDER_FAILURE;

  constructor() {}
}

export type orderActions =
  SaveOrder |
  SaveOrderSuccess |
  SaveOrderFailure;
