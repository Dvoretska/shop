import { Action } from '@ngrx/store';

export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';
export const ADD_PRODUCT_TO_CART_SUCCESS = 'ADD_PRODUCT_TO_CART_SUCCESS';
export const ADD_PRODUCT_TO_CART_FAILURE = 'ADD_PRODUCT_TO_CART_FAILURE';
export const REMOVE_IS_ADDED_TO_CART = 'REMOVE_IS_ADDED_TO_CART';
export const FETCH_CART = 'FETCH_CART';
export const FETCH_CART_SUCCESS = 'FETCH_CART_SUCCESS';
export const FETCH_CART_FAILURE = 'FETCH_CART_FAILURE';
export const CLEAR_CART = 'CLEAR_CART';
export const DELETE_PRODUCT_FROM_CART = 'DELETE_PRODUCT_FROM_CART';
export const DELETE_PRODUCT_FROM_CART_SUCCESS = 'DELETE_PRODUCT_FROM_CART_SUCCESS';
export const DELETE_PRODUCT_FROM_CART_FAILURE = 'DELETE_PRODUCT_FROM_CART_FAILURE';
export const DECREASE_QUANTITY_OF_PRODUCT_IN_CART = 'DECREASE_QUANTITY_OF_PRODUCT_IN_CART';
export const DECREASE_QUANTITY_OF_PRODUCT_IN_CART_SUCCESS = 'DECREASE_QUANTITY_OF_PRODUCT_IN_CART_SUCCESS';
export const DECREASE_QUANTITY_OF_PRODUCT_IN_CART_FAILURE = 'DECREASE_QUANTITY_OF_PRODUCT_IN_CART_FAILURE';

export class AddProductToCart implements Action {
  readonly type = ADD_PRODUCT_TO_CART;

  constructor(public payload: { cart: {product_id: number, size: string, quantity: number }, totalNumber: number}) {}
}

export class AddProductToCartSuccess implements Action {
  readonly type = ADD_PRODUCT_TO_CART_SUCCESS;

  constructor(public payload: {quantity: number, amount: number, product: any, totalAmount: number, totalNumberOfProducts: number}) {}
}

export class AddProductToCartFailure implements Action {
  readonly type = ADD_PRODUCT_TO_CART_FAILURE;

  constructor(public payload: {error: any}) {}
}

export class RemoveIsAddedToCart implements Action {
  readonly type = REMOVE_IS_ADDED_TO_CART;

  constructor() {}
}

export class FetchCart implements Action {
  readonly type = FETCH_CART;

  constructor() {}
}

export class FetchCartSuccess implements Action {
  readonly type = FETCH_CART_SUCCESS;

  constructor(public payload: {cart: any[], totalNumberOfProducts: number, totalAmount: number}) {}
}

export class FetchCartFailure implements Action {
  readonly type = FETCH_CART_FAILURE;

  constructor(public payload: {error: any}) {}
}

export class ClearCart implements Action {
  readonly type = CLEAR_CART;

  constructor() {}
}

export class DeleteProductFromCart implements Action {
  readonly type = DELETE_PRODUCT_FROM_CART;

  constructor(public payload: {product_id: number, size: string}) {}
}

export class DeleteProductFromCartSuccess implements Action {
  readonly type = DELETE_PRODUCT_FROM_CART_SUCCESS;

  constructor(public payload: {product_id: number, size: string, totalNumberOfProducts: number, totalAmount: number}) {}
}

export class DeleteProductFromCartFailure implements Action {
  readonly type = DELETE_PRODUCT_FROM_CART_FAILURE;

  constructor(public payload: {error: any}) {}
}

export class DecreaseQuantityOfProductInCart implements Action {
  readonly type = DECREASE_QUANTITY_OF_PRODUCT_IN_CART;

  constructor(public payload: {product_id: number, size: string}) {}
}

export class DecreaseQuantityOfProductInCartSuccess implements Action {
  readonly type = DECREASE_QUANTITY_OF_PRODUCT_IN_CART_SUCCESS;

  constructor(public payload: {quantity: number, amount: number, product: any, totalAmount: number, totalNumberOfProducts: number}) {}
}

export class DecreaseQuantityOfProductInCartFailure implements Action {
  readonly type = DECREASE_QUANTITY_OF_PRODUCT_IN_CART_FAILURE;

  constructor(public payload: {error: any}) {}
}


export type cartActions =
            AddProductToCart |
            AddProductToCartSuccess |
            AddProductToCartFailure |
            RemoveIsAddedToCart |
            FetchCart |
            FetchCartSuccess |
            FetchCartFailure |
            ClearCart |
            DeleteProductFromCart |
            DeleteProductFromCartSuccess |
            DeleteProductFromCartFailure |
            DecreaseQuantityOfProductInCart |
            DecreaseQuantityOfProductInCartSuccess |
            DecreaseQuantityOfProductInCartFailure;
