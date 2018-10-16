import * as shopActions from './shop.actions';
import {FETCH_PRODUCTS_FAILURE} from "./shop.actions";


export class ShopState {
  constructor(
    public products: any[],
    public loading: boolean,
    public error: any,
    public categories: any,
    public productWasAdded: boolean
  ) { }
}


export const initialState: ShopState = {
  products: [],
  loading: false,
  error: null,
  categories: null,
  productWasAdded: false
};

export function shopReducer(state: ShopState =initialState, action: shopActions.shopActions) {
  switch(action.type) {
    case shopActions.ADD_PRODUCT:
      return {
        ...state,
        loading: true,
        productWasAdded: false
      };
    case shopActions.ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        productWasAdded: true
      };
    case shopActions.ADD_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        productWasAdded: false
      };
    case shopActions.INIT_PRODUCT_WAS_ADDED:
      return {
        ...state,
        productWasAdded: false
      };
    case shopActions.FETCH_CATEGORIES:
      return {
        ...state,
        error: null
      };
    case shopActions.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        error: null,
        categories: action.payload.categories
      };
    case shopActions.FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        error: action.payload.error
      };
    case shopActions.FETCH_PRODUCTS:
      return {
        ...state,
        error: null,
        loading: true
      };
    case shopActions.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        products: state.products.concat(action.payload.products)
      };
    case shopActions.FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        error: action.payload.error
      };
    default:
      return state;
  }
}
