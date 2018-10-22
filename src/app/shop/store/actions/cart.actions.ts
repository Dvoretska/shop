import { Action } from '@ngrx/store';

export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';
export const ADD_PRODUCT_TO_CART_SUCCESS = 'ADD_PRODUCT_TO_CART_SUCCESS';
export const ADD_PRODUCT_TO_CART_FAILURE = 'ADD_PRODUCT_TO_CART_FAILURE';
export const REMOVE_IS_ADDED_TO_CART = 'REMOVE_IS_ADDED_TO_CART';


export class AddProductToCart implements Action {
  readonly type = ADD_PRODUCT_TO_CART;

  constructor(public payload: { cart: {product_id: number, size: string, quantity: number }, totalQuantity: number}) {}
}

export class AddProductToCartSuccess implements Action {
  readonly type = ADD_PRODUCT_TO_CART_SUCCESS;

  constructor(public payload: {quantity: number}) {}
}

export class AddProductToCartFailure implements Action {
  readonly type = ADD_PRODUCT_TO_CART_FAILURE;

  constructor(public payload: {error: any}) {}
}

export class RemoveIsAddedToCart implements Action {
  readonly type = REMOVE_IS_ADDED_TO_CART;

  constructor() {}
}


export type cartActions =
            AddProductToCart |
            AddProductToCartSuccess |
            AddProductToCartFailure |
            RemoveIsAddedToCart;
