import { Action } from '@ngrx/store';


export const ADD_PRODUCT = 'ADD_PRODUCT';
export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';
export const ADD_PRODUCT_FAILURE = 'ADD_PRODUCT_FAILURE';

export const REMOVE_PRODUCT_WAS_ADDED = 'REMOVE_PRODUCT_WAS_ADDED';

export const FETCH_PRODUCTS_INIT = 'FETCH_PRODUCTS_INIT';

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

export const FETCH_PRODUCTS_BY_SEARCH_INIT = 'FETCH_PRODUCTS_BY_SEARCH_INIT';

export const FETCH_PRODUCTS_BY_SEARCH = 'FETCH_PRODUCTS_BY_SEARCH';
export const FETCH_PRODUCTS_BY_SEARCH_SUCCESS = 'FETCH_PRODUCTS_BY_SEARCH_SUCCESS';
export const FETCH_PRODUCTS_BY_SEARCH_FAILURE = 'FETCH_PRODUCTS_BY_SEARCH_FAILURE';

export const FETCH_PRODUCT_DETAILS = 'FETCH_PRODUCT_DETAILS';
export const FETCH_PRODUCT_DETAILS_SUCCESS = 'FETCH_PRODUCT_DETAILS_SUCCESS';
export const FETCH_PRODUCT_DETAILS_FAILURE = 'FETCH_PRODUCT_DETAILS_FAILURE';

export const SET_TARGET_ID = 'SET_TARGET_ID';
export const REMOVE_TARGET_ID = 'REMOVE_TARGET_ID';

// _____________________________________________________

export class AddProduct implements Action {
  readonly type = ADD_PRODUCT;

  constructor(public payload: any) {}
}

export class AddProductSuccess implements Action {
  readonly type = ADD_PRODUCT_SUCCESS;

  constructor(public payload: {product: any}) {}
}

export class AddProductFailure implements Action {
  readonly type = ADD_PRODUCT_FAILURE;

  constructor() {}
}

// _____________________________________________________

export class RemoveProductWasAdded implements Action {
  readonly type = REMOVE_PRODUCT_WAS_ADDED;

  constructor() {}
}

// _____________________________________________________

export class FetchProductsInit implements Action {
  readonly type = FETCH_PRODUCTS_INIT;

  constructor(public payload: string) {}
}

// _____________________________________________________

export class FetchProducts implements Action {
  readonly type = FETCH_PRODUCTS;

  constructor(public payload: string) {}
}

export class FetchProductsSuccess implements Action {
  readonly type = FETCH_PRODUCTS_SUCCESS;

  constructor(public payload: {products: any, totalAmount: any}) {}
}

export class FetchProductsFailure implements Action {
  readonly type = FETCH_PRODUCTS_FAILURE;

  constructor() {}
}

// _____________________________________________________

export class FetchProductsBySearchInit implements Action {
  readonly type = FETCH_PRODUCTS_BY_SEARCH_INIT;

  constructor(public payload: string) {}
}

// _____________________________________________________

export class FetchProductsBySearch implements Action {
  readonly type = FETCH_PRODUCTS_BY_SEARCH;

  constructor(public payload: string) {}
}

export class FetchProductsBySearchSuccess implements Action {
  readonly type = FETCH_PRODUCTS_BY_SEARCH_SUCCESS;

  constructor(public payload: {products: any, totalAmount: any}) {}
}

export class FetchProductsBySearchFailure implements Action {
  readonly type = FETCH_PRODUCTS_BY_SEARCH_FAILURE;

  constructor() {}
}

// _____________________________________________________

export class FetchProductDetails implements Action {
  readonly type = FETCH_PRODUCT_DETAILS;

  constructor(public payload: number) {}
}

export class FetchProductDetailsSuccess implements Action {
  readonly type = FETCH_PRODUCT_DETAILS_SUCCESS;

  constructor(public payload: {product: any}) {}
}

export class FetchProductDetailsFailure implements Action {
  readonly type = FETCH_PRODUCT_DETAILS_FAILURE;

  constructor() {}
}

// _____________________________________________________

export class SetTargetId implements Action {
  readonly type = SET_TARGET_ID;

  constructor(public payload: number) {}
}

// _____________________________________________________

export class RemoveTargetId implements Action {
  readonly type = REMOVE_TARGET_ID;

  constructor() {}
}


export type productsActions = AddProduct |
            AddProductSuccess |
            AddProductFailure |
            RemoveProductWasAdded |
            FetchProducts |
            FetchProductsSuccess |
            FetchProductsFailure |
            FetchProductsInit |
            FetchProductDetails |
            FetchProductDetailsSuccess |
            FetchProductDetailsFailure |
            FetchProductsBySearch |
            FetchProductsBySearchSuccess |
            FetchProductsBySearchFailure |
            FetchProductsBySearchInit |
            SetTargetId |
            RemoveTargetId;
