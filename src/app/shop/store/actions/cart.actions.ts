import { Action } from '@ngrx/store';

export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';
export const ADD_PRODUCT_TO_CART_SUCCESS = 'ADD_PRODUCT_TO_CART_SUCCESS';
export const ADD_PRODUCT_TO_CART_FAILURE = 'ADD_PRODUCT_TO_CART_FAILURE';


export class AddProductToCart implements Action {
  readonly type = ADD_PRODUCT_TO_CART;

  constructor(public payload: { product_id: number, size: string, quantity: number }) {}
}

export class AddProductToCartSuccess implements Action {
  readonly type = ADD_PRODUCT_TO_CART_SUCCESS;

  constructor() {}
}

export class AddProductToCartFailure implements Action {
  readonly type = ADD_PRODUCT_TO_CART_FAILURE;

  constructor(public payload: {error: any}) {}
}


export type cartActions =
            AddProductToCart |
            AddProductToCartSuccess |
            AddProductToCartFailure;
