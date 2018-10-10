import { Action } from '@ngrx/store';
import { Product } from '../product.model';

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const ADD_PRODUCT_START = 'ADD_PRODUCT_START';
export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';
export const ADD_PRODUCT_FAILURE = 'ADD_PRODUCT_FAILURE';


export class AddProduct implements Action {
  readonly type = ADD_PRODUCT;

  constructor(public payload: any) {}

}

export class AddProductStart implements Action {
  readonly type = ADD_PRODUCT_START;

  constructor() {}
}

export class AddProductSuccess implements Action {
  readonly type = ADD_PRODUCT_SUCCESS;

  constructor(public payload: {product: any}) {}
}

export class AddProductFailure implements Action {
  readonly type = ADD_PRODUCT_FAILURE;

  constructor(public payload: {error: any}) {}
}

export type shopActions = AddProduct |
            AddProductSuccess |
            AddProductFailure |
            AddProductStart;
