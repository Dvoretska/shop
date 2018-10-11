import { Action } from '@ngrx/store';
import { Product } from '../product.model';

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';
export const ADD_PRODUCT_FAILURE = 'ADD_PRODUCT_FAILURE';
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';


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

  constructor(public payload: {error: any}) {}
}

export class FetchCategories implements Action {
  readonly type = FETCH_CATEGORIES;

  constructor() {}
}

export class FetchCategoriesSuccess implements Action {
  readonly type = FETCH_CATEGORIES_SUCCESS;

  constructor(public payload: {categories: any}) {}
}

export class FetchCategoriesFailure implements Action {
  readonly type = FETCH_CATEGORIES_FAILURE;

  constructor(public payload: {error: any}) {}
}

export type shopActions = AddProduct |
            AddProductSuccess |
            AddProductFailure |
            FetchCategories |
            FetchCategoriesSuccess |
            FetchCategoriesFailure;
