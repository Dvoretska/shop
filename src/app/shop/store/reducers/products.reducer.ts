import * as productsActions from '../actions/products.actions';


export class ProductsState {
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


export const initialState: ProductsState = {
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

export function productsReducer(state: ProductsState =initialState, action: productsActions.productsActions) {
  switch(action.type) {
    case productsActions.ADD_PRODUCT:
      return {
        ...state,
        addProductLoading: true,
        productWasAdded: false
      };
    case productsActions.ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        addProductLoading: false,
        error: null,
        productWasAdded: true
      };
    case productsActions.ADD_PRODUCT_FAILURE:
      return {
        ...state,
        addProductLoading: false,
        error: action.payload.error,
        productWasAdded: false
      };
    case productsActions.INIT_PRODUCT_WAS_ADDED:
      return {
        ...state,
        productWasAdded: false
      };
    case productsActions.FETCH_CATEGORIES:
      return {
        ...state,
        error: null
      };
    case productsActions.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        error: null,
        categories: action.payload.categories
      };
    case productsActions.FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        error: action.payload.error
      };
    case productsActions.FETCH_PRODUCTS:
      return {
        ...state,
        error: null,
        targetId: null,
        fetchProductsLoading: true,
        skip: action.payload.skip
      };
    case productsActions.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        error: null,
        fetchProductsLoading: false,
        products: state.products.concat(action.payload.products),
        totalAmount: action.payload.totalAmount[0].count
      };
    case productsActions.FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        fetchProductsLoading: false,
        error: action.payload.error
      };
    case productsActions.FETCH_PRODUCTS_INIT:
      return {
        ...state,
        error: null,
        fetchProductsInitLoading: true
      };
    case productsActions.FETCH_PRODUCTS_INIT_SUCCESS:
      return {
        ...state,
        error: null,
        fetchProductsInitLoading: false,
        products: [...action.payload.products],
        totalAmount: action.payload.totalAmount[0].count
      };
    case productsActions.FETCH_PRODUCTS_INIT_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        fetchProductsInitLoading: false
      };
    case productsActions.FETCH_PRODUCT_DETAILS:
      return {
        ...state,
        error: null,
        productDetailsLoading: true
      };
    case productsActions.FETCH_PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        error: null,
        productDetailsLoading: false,
        product: action.payload.product
      };
    case productsActions.FETCH_PRODUCT_DETAILS_FAILURE:
      return {
        ...state,
        productDetailsLoading: false,
        error: action.payload.error
      };
    case productsActions.SET_TARGET_ID:
      return {
        ...state,
        targetId: action.payload
      };

    default:
      return state;
  }
}

