import * as productsActions from '../actions/products.actions';


export class ProductsState {
  constructor(
    public products: any[],
    public sizes: string[],
    public loading: boolean,
    public categories: any[],
    public subcategories: any,
    public productWasAdded: boolean,
    public product: any,
    public totalAmount: any,
    public addProductLoading: boolean,
    public productDetailsLoading: boolean,
    public fetchProductsLoading: boolean,
    public fetchProductsInitLoading: boolean,
    public fetchProductsBySearchLoading: boolean,
    public targetId: number
  ) { }
}


export const initialState: ProductsState = {
  products: [],
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  loading: false,
  addProductLoading: false,
  productDetailsLoading: false,
  fetchProductsLoading: false,
  fetchProductsInitLoading: false,
  fetchProductsBySearchLoading: false,
  categories: [],
  subcategories: [],
  productWasAdded: false,
  product: null,
  totalAmount: null,
  targetId: null
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
        productWasAdded: true
      };
    case productsActions.ADD_PRODUCT_FAILURE:
      return {
        ...state,
        addProductLoading: false,
        productWasAdded: false
      };
    case productsActions.REMOVE_PRODUCT_WAS_ADDED:
      return {
        ...state,
        productWasAdded: false
      };

    case productsActions.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload.categories
      };

    case productsActions.FETCH_SUBCATEGORIES:
      return {
        ...state,
        subcategories: []
      };

    case productsActions.FETCH_SUBCATEGORIES_SUCCESS:
      return {
        ...state,
        subcategories: action.payload.subcategories
      };


    case productsActions.FETCH_PRODUCTS:
      return {
        ...state,
        targetId: null,
        fetchProductsLoading: true
      };

    case productsActions.FETCH_PRODUCTS_INIT:
      return {
        ...state,
        products: [],
        fetchProductsInitLoading: true
      };

    case productsActions.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        fetchProductsLoading: false,
        fetchProductsInitLoading: false,
        products: state.products.concat(action.payload.products),
        totalAmount: action.payload.totalAmount[0].count
      };
    case productsActions.FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        fetchProductsLoading: false,
        fetchProductsInitLoading: false
      };

    case productsActions.FETCH_PRODUCTS_BY_SEARCH:
      return {
        ...state,
        fetchProductsBySearchLoading: true
      };

    case productsActions.FETCH_PRODUCTS_BY_SEARCH_INIT:
      return {
        ...state,
        products: [],
        fetchProductsInitLoading: true
      };
    case productsActions.FETCH_PRODUCTS_BY_SEARCH_SUCCESS:
      return {
        ...state,
        fetchProductsBySearchLoading: false,
        fetchProductsInitLoading: false,
        products: state.products.concat(action.payload.products),
        totalAmount: action.payload.totalAmount[0].count
      };
    case productsActions.FETCH_PRODUCTS_BY_SEARCH_FAILURE:
      return {
        ...state,
        fetchProductsBySearchLoading: false,
        fetchProductsInitLoading: false
      };

    case productsActions.FETCH_PRODUCT_DETAILS:
      return {
        ...state,
        productDetailsLoading: true
      };
    case productsActions.FETCH_PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        productDetailsLoading: false,
        product: action.payload.product
      };
    case productsActions.FETCH_PRODUCT_DETAILS_FAILURE:
      return {
        ...state,
        productDetailsLoading: false
      };
    case productsActions.SET_TARGET_ID:
      return {
        ...state,
        targetId: action.payload
      };
    case productsActions.REMOVE_TARGET_ID:
      return {
        ...state,
        targetId: null
      };


    default:
      return state;
  }
}

