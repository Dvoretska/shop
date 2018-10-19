import * as shopActions from './shop.actions';


export class ShopState {
  constructor(
    public products: any[],
    public loading: boolean,
    public error: any,
    public categories: any,
    public productWasAdded: boolean,
    public product: any,
    public totalAmount: any,
    public addProductLoading: boolean,
    public productDetailsLoading: boolean,
    public fetchProductsLoading: boolean,
    public fetchProductsInitLoading: boolean,
    public targetId: number,
    public skip: number
  ) { }
}


export const initialState: ShopState = {
  products: [],
  loading: false,
  addProductLoading: false,
  productDetailsLoading: false,
  fetchProductsLoading: false,
  fetchProductsInitLoading: false,
  error: null,
  categories: null,
  productWasAdded: false,
  product: null,
  totalAmount: null,
  targetId: null,
  skip: 0
};

export function shopReducer(state: ShopState =initialState, action: shopActions.shopActions) {
  switch(action.type) {
    case shopActions.ADD_PRODUCT:
      return {
        ...state,
        addProductLoading: true,
        productWasAdded: false
      };
    case shopActions.ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        addProductLoading: false,
        error: null,
        productWasAdded: true
      };
    case shopActions.ADD_PRODUCT_FAILURE:
      return {
        ...state,
        addProductLoading: false,
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
        targetId: null,
        fetchProductsLoading: true,
        skip: action.payload.skip
      };
    case shopActions.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        error: null,
        fetchProductsLoading: false,
        products: state.products.concat(action.payload.products),
        totalAmount: action.payload.totalAmount[0].count
      };
    case shopActions.FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        fetchProductsLoading: false,
        error: action.payload.error
      };
    case shopActions.FETCH_PRODUCTS_INIT:
      return {
        ...state,
        error: null,
        fetchProductsInitLoading: true
      };
    case shopActions.FETCH_PRODUCTS_INIT_SUCCESS:
      return {
        ...state,
        error: null,
        fetchProductsInitLoading: false,
        products: [...action.payload.products],
        totalAmount: action.payload.totalAmount[0].count
      };
    case shopActions.FETCH_PRODUCTS_INIT_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        fetchProductsInitLoading: false
      };

    case shopActions.FETCH_PRODUCT_DETAILS:
      return {
        ...state,
        error: null,
        fetchProductsInitLoading: false,
        productDetailsLoading: true
      };
    case shopActions.FETCH_PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        error: null,
        productDetailsLoading: false,
        product: action.payload.product
      };
    case shopActions.FETCH_PRODUCT_DETAILS_FAILURE:
      return {
        ...state,
        productDetailsLoading: false,
        error: action.payload.error
      };
    case shopActions.SET_TARGET_ID:
      return {
        ...state,
        targetId: action.payload
      };
    default:
      return state;
  }
}
