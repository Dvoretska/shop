import { Action } from '@ngrx/store';

export const ADD_PRODUCT = 'ADD_PRODUCT';

export class addProduct implements Action {
  readonly type = ADD_PRODUCT;
  payload;
}

export type shopActions = addProduct;
