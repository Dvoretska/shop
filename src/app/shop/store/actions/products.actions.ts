import { Action } from '@ngrx/store';


export const ADD_PRODUCT = 'ADD_PRODUCT';
export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';
export const ADD_PRODUCT_FAILURE = 'ADD_PRODUCT_FAILURE';

export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';

export const REMOVE_PRODUCT_WAS_ADDED_OR_UPDATED = 'REMOVE_PRODUCT_WAS_ADDED_OR_UPDATED';

export const FETCH_PRODUCTS_INIT = 'FETCH_PRODUCTS_INIT';

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

export const FETCH_PRODUCTS_FROM_STOCK = 'FETCH_PRODUCTS_FROM_STOCK';
export const FETCH_PRODUCTS_FROM_STOCK_SUCCESS = 'FETCH_PRODUCTS_FROM_STOCK_SUCCESS';

export const FETCH_SIZES_QUANTITY = 'FETCH_SIZES_QUANTITY';
export const FETCH_SIZES_QUANTITY_SUCCESS = 'FETCH_SIZES_QUANTITY_SUCCESS';

export const UPDATE_SIZES_QUANTITY = 'UPDATE_SIZES_QUANTITY';
export const UPDATE_SIZES_QUANTITY_SUCCESS = 'UPDATE_SIZES_QUANTITY_SUCCESS';

export const GET_SIZES = 'GET_SIZES';
export const GET_SIZES_SUCCESS = 'GET_SIZES_SUCCESS';

export const ADD_QUANTITY_TO_STOCK = 'ADD_QUANTITY_TO_STOCK';
export const ADD_QUANTITY_TO_STOCK_SUCCESS = 'ADD_QUANTITY_TO_STOCK_SUCCESS';

export const FETCH_PRODUCTS_BY_SEARCH_INIT = 'FETCH_PRODUCTS_BY_SEARCH_INIT';

export const FETCH_PRODUCTS_BY_SEARCH = 'FETCH_PRODUCTS_BY_SEARCH';
export const FETCH_PRODUCTS_BY_SEARCH_SUCCESS = 'FETCH_PRODUCTS_BY_SEARCH_SUCCESS';
export const FETCH_PRODUCTS_BY_SEARCH_FAILURE = 'FETCH_PRODUCTS_BY_SEARCH_FAILURE';

export const FETCH_PRODUCT_DETAILS = 'FETCH_PRODUCT_DETAILS';
export const FETCH_PRODUCT_DETAILS_SUCCESS = 'FETCH_PRODUCT_DETAILS_SUCCESS';

export const SET_TARGET_ID = 'SET_TARGET_ID';
export const REMOVE_TARGET_ID = 'REMOVE_TARGET_ID';
export const REMOVE_PRODUCT_WAS_DELETED = 'REMOVE_PRODUCT_WAS_DELETED';

// _____________________________________________________

export class AddProduct implements Action {
  readonly type = ADD_PRODUCT;

  constructor(public payload: any) {}
}

export class AddProductSuccess implements Action {
  readonly type = ADD_PRODUCT_SUCCESS;

  constructor(public payload: {product_id: number}) {}
}

export class AddProductFailure implements Action {
  readonly type = ADD_PRODUCT_FAILURE;

  constructor() {}
}

// _____________________________________________________

export class UpdateProduct implements Action {
  readonly type = UPDATE_PRODUCT;

  constructor(public payload: any) {}
}

export class UpdateProductSuccess implements Action {
  readonly type = UPDATE_PRODUCT_SUCCESS;

  constructor(public payload: {product_id: number}) {}
}

// _____________________________________________________

export class DeleteProduct implements Action {
  readonly type = DELETE_PRODUCT;

  constructor(public payload: {product_id: number}) {}
}

export class DeleteProductSuccess implements Action {
  readonly type = DELETE_PRODUCT_SUCCESS;

  constructor() {}
}

// _____________________________________________________

export class RemoveProductWasAddedOrUpdated implements Action {
  readonly type = REMOVE_PRODUCT_WAS_ADDED_OR_UPDATED;

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

export class FetchProductsFromStock implements Action {
  readonly type = FETCH_PRODUCTS_FROM_STOCK;

  constructor(public payload: string) {}
}

export class FetchProductsFromStockSuccess implements Action {
  readonly type = FETCH_PRODUCTS_FROM_STOCK_SUCCESS;

  constructor(public payload: {productsFromStock: any, totalAmount: any}) {}
}
// _____________________________________________________

export class FetchSizesQuantity implements Action {
  readonly type = FETCH_SIZES_QUANTITY;

  constructor(public payload: number) {}
}

export class FetchSizesQuantitySuccess implements Action {
  readonly type = FETCH_SIZES_QUANTITY_SUCCESS;

  constructor(public payload: {sizesQuantity: any[]}) {}
}


// _____________________________________________________

export class UpdateSizesQuantity implements Action {
  readonly type = UPDATE_SIZES_QUANTITY;

  constructor(public payload: {savedData: any, callback: any}) {}
}

export class UpdateSizesQuantitySuccess implements Action {
  readonly type = UPDATE_SIZES_QUANTITY_SUCCESS;

  constructor() {}
}

// _____________________________________________________

export class GetSizes implements Action {
  readonly type = GET_SIZES;

  constructor() {}
}

export class GetSizesSuccess implements Action {
  readonly type = GET_SIZES_SUCCESS;

  constructor(public payload: {sizes: string[]}) {}
}

// _____________________________________________________

export class AddQuantityToStock implements Action {
  readonly type = ADD_QUANTITY_TO_STOCK;

  constructor(public payload: {size_id: string, product_id: number, quantity: number, showToast: any}) {}
}

export class AddQuantityToStockSuccess implements Action {
  readonly type = ADD_QUANTITY_TO_STOCK_SUCCESS;

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
// _____________________________________________________

export class RemoveProductWasDeleted implements Action {
  readonly type = REMOVE_PRODUCT_WAS_DELETED;

  constructor() {}
}


export type productsActions = AddProduct |
            AddProductSuccess |
            AddProductFailure |
            RemoveProductWasAddedOrUpdated |
            FetchProducts |
            FetchProductsSuccess |
            FetchProductsFailure |
            FetchProductsInit |
            FetchProductDetails |
            FetchProductDetailsSuccess |
            FetchProductsBySearch |
            FetchProductsBySearchSuccess |
            FetchProductsBySearchFailure |
            FetchProductsBySearchInit |
            UpdateProduct |
            UpdateProductSuccess |
            DeleteProduct |
            DeleteProductSuccess |
            SetTargetId |
            RemoveTargetId |
            RemoveProductWasDeleted |
            FetchProductsFromStock |
            FetchProductsFromStockSuccess |
            FetchSizesQuantity |
            FetchSizesQuantitySuccess |
            UpdateSizesQuantity |
            UpdateSizesQuantitySuccess |
            GetSizes |
            GetSizesSuccess |
            AddQuantityToStock |
            AddQuantityToStockSuccess;
