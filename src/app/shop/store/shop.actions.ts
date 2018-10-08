import { Action } from '@ngrx/store';

export const ADD_PRODUCT = 'ADD_PRODUCT';

export class addProduct implements Action {
  readonly type = ADD_PRODUCT;

  constructor(public payload: any) {}
}

export type shopActions = addProduct;
