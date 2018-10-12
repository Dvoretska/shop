import { Action } from '@ngrx/store';
import { Product } from '../product.model';

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';
export const ADD_PRODUCT_FAILURE = 'ADD_PRODUCT_FAILURE';
export const INIT_PRODUCT_WAS_ADDED = 'INIT_PRODUCT_WAS_ADDED';

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';


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

export class InitProductWasAdded implements Action {
  readonly type = INIT_PRODUCT_WAS_ADDED;

  constructor() {}
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

export class FetchProducts implements Action {
  readonly type = FETCH_PRODUCTS;

  constructor() {}
}

export class FetchProductsSuccess implements Action {
  readonly type = FETCH_PRODUCTS_SUCCESS;

  constructor(public payload: {products: Product[], images: any}) {}
}

export class FetchProductsFailure implements Action {
  readonly type = FETCH_PRODUCTS_FAILURE;

  constructor() {}
}


export type shopActions = AddProduct |
            AddProductSuccess |
            AddProductFailure |
            FetchCategories |
            FetchCategoriesSuccess |
            FetchCategoriesFailure |
            InitProductWasAdded |
            FetchProducts |
            FetchProductsSuccess |
            FetchProductsFailure;
