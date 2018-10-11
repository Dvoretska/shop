import * as shopActions from './shop.actions';

export class ShopState {
  constructor(
    public products: any,
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
        productWasAdded: true,
        products: [...state.products, action.payload.product]
      };
    case shopActions.ADD_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
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
    default:
      return state;
  }
}
