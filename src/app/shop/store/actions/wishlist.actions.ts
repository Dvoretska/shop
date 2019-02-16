import { Action } from '@ngrx/store';

export const ADD_PRODUCT_TO_WISHLIST = 'ADD_PRODUCT_TO_WISHLIST';
export const ADD_PRODUCT_TO_WISHLIST_SUCCESS = 'ADD_PRODUCT_TO_WISHLIST_SUCCESS';
export const ADD_PRODUCT_TO_WISHLIST_FAILURE = 'ADD_PRODUCT_TO_WISHLIST_FAILURE';

export const FETCH_WISHLIST = 'FETCH_WISHLIST';
export const FETCH_WISHLIST_SUCCESS = 'FETCH_WISHLIST_SUCCESS';
export const FETCH_WISHLIST_FAILURE = 'FETCH_WISHLIST_FAILURE';

export const DELETE_PRODUCT_FROM_WISHLIST = 'DELETE_PRODUCT_FROM_WISHLIST';
export const DELETE_PRODUCT_FROM_WISHLIST_SUCCESS = 'DELETE_PRODUCT_FROM_WISHLIST_SUCCESS';
export const DELETE_PRODUCT_FROM_WISHLIST_FAILURE = 'DELETE_PRODUCT_FROM_WISHLIST_FAILURE';

export const GET_TOTAL_NUM_OF_PRODUCTS_IN_WISHLIST = 'GET_TOTAL_NUM_OF_PRODUCTS_IN_WISHLIST';
export const GET_TOTAL_NUM_OF_PRODUCTS_IN_WISHLIST_SUCCESS = 'GET_TOTAL_NUM_OF_PRODUCTS_IN_WISHLIST_SUCCESS';
export const GET_TOTAL_NUM_OF_PRODUCTS_IN_WISHLIST_FAILURE = 'GET_TOTAL_NUM_OF_PRODUCTS_IN_WISHLIST_FAILURE';


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

export class DeleteProductFromWishlist implements Action {
  readonly type = DELETE_PRODUCT_FROM_WISHLIST;

  constructor(public payload: {product_id: number}) {}
}

export class DeleteProductFromWishlistSuccess implements Action {
  readonly type = DELETE_PRODUCT_FROM_WISHLIST_SUCCESS;

  constructor(public payload: {product_id: number, totalNumOfProductsInWishlist: number}) {}
}

export class DeleteProductFromWishlistFailure implements Action {
  readonly type = DELETE_PRODUCT_FROM_WISHLIST_FAILURE;

  constructor() {}
}

export class GetTotalNumOfProductsInWishlist implements Action {
  readonly type = GET_TOTAL_NUM_OF_PRODUCTS_IN_WISHLIST;

  constructor() {}
}

export class GetTotalNumOfProductsInWishlistSuccess implements Action {
  readonly type = GET_TOTAL_NUM_OF_PRODUCTS_IN_WISHLIST_SUCCESS;

  constructor(public payload: {totalNumOfProductsInWishlist: number}) {}
}

export class GetTotalNumOfProductsInWishlistFailure implements Action {
  readonly type = GET_TOTAL_NUM_OF_PRODUCTS_IN_WISHLIST_FAILURE;

  constructor() {}
}

export type wishlistActions =
            AddProductToWishlist |
            AddProductToWishlistSuccess |
            AddProductToWishlistFailure |
            FetchWishlist |
            FetchWishlistSuccess |
            FetchWishlistFailure |
            DeleteProductFromWishlist |
            DeleteProductFromWishlistSuccess |
            DeleteProductFromWishlistFailure |
            GetTotalNumOfProductsInWishlist |
            GetTotalNumOfProductsInWishlistSuccess |
            GetTotalNumOfProductsInWishlistFailure;
