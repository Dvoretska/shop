import { Action } from '@ngrx/store';
import {FETCH_CART, FETCH_CART_FAILURE, FETCH_CART_SUCCESS} from "./cart.actions";


export const ADD_PRODUCT_TO_WISHLIST = 'ADD_PRODUCT_TO_WISHLIST';
export const ADD_PRODUCT_TO_WISHLIST_SUCCESS = 'ADD_PRODUCT_TO_WISHLIST_SUCCESS';
export const ADD_PRODUCT_TO_WISHLIST_FAILURE = 'ADD_PRODUCT_TO_WISHLIST_FAILURE';
export const FETCH_WISHLIST = 'FETCH_WISHLIST';
export const FETCH_WISHLIST_SUCCESS = 'FETCH_WISHLIST_SUCCESS';
export const FETCH_WISHLIST_FAILURE = 'FETCH_WISHLIST_FAILURE';


export class AddProductToWishlist implements Action {
  readonly type = ADD_PRODUCT_TO_WISHLIST;

  constructor(public payload: {product_id: number}) {}
}

export class AddProductToWishlistSuccess implements Action {
  readonly type = ADD_PRODUCT_TO_WISHLIST_SUCCESS;

  constructor(public payload: {item: any, totalNumOfProductsInWishlist: number}) {}
}

export class AddProductToWishlistFailure implements Action {
  readonly type = ADD_PRODUCT_TO_WISHLIST_FAILURE;

  constructor() {}
}

export class FetchWishlist implements Action {
  readonly type = FETCH_WISHLIST;

  constructor() {}
}

export class FetchWishlistSuccess implements Action {
  readonly type = FETCH_WISHLIST_SUCCESS;

  constructor(public payload: {wishlist: any[], totalNumOfProductsInWishlist: number}) {}
}

export class FetchWishlistFailure implements Action {
  readonly type = FETCH_WISHLIST_FAILURE;

  constructor() {}
}


export type wishlistActions =
            AddProductToWishlist |
            AddProductToWishlistSuccess |
            AddProductToWishlistFailure |
            FetchWishlist |
            FetchWishlistSuccess |
            FetchWishlistFailure;
