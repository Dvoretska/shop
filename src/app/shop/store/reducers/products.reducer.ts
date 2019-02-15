import * as productsActions from '../actions/products.actions';


export class ProductsState {
  constructor(
    public products: any[],
    public productsFromStock: any[],
    public fetchSizesQuantityLoading: boolean,
    public sizesQuantity: any[],
    public totalAmountStockProducts: number,
    public fetchProductsFromStockLoading: boolean,
    public sizes: string[],
    public availableSizes: any[],
    public getSizesLoading: boolean,
    public loading: boolean,
    public productWasAdded: boolean,
    public product: any,
    public totalAmount: any,
    public addProductLoading: boolean,
    public productDetailsLoading: boolean,
    public fetchProductsLoading: boolean,
    public fetchProductsInitLoading: boolean,
    public fetchProductsBySearchLoading: boolean,
    public targetId: number,
    public addedProductId: number,
    public productWasUpdated: boolean,
    public productWasDeleted: boolean
  ) { }
}


export const initialState: ProductsState = {
  products: [],
  productsFromStock: [],
  fetchSizesQuantityLoading: false,
  sizesQuantity: [],
  totalAmountStockProducts: null,
  sizes: [],
  availableSizes: [],
  getSizesLoading: false,
  loading: false,
  fetchProductsFromStockLoading: false,
  addProductLoading: false,
  productDetailsLoading: false,
  fetchProductsLoading: false,
  fetchProductsInitLoading: false,
  fetchProductsBySearchLoading: false,
  productWasAdded: false,
  product: null,
  totalAmount: null,
  targetId: null,
  addedProductId: null,
  productWasUpdated: false,
  productWasDeleted: false
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
        productWasAdded: true,
        addedProductId: action.payload.product_id
      };
    case productsActions.ADD_PRODUCT_FAILURE:
      return {
        ...state,
        addProductLoading: false,
        productWasAdded: false
      };
    case productsActions.UPDATE_PRODUCT:
      return {
        ...state,
        productWasUpdated: false
      };
    case productsActions.UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        productWasUpdated: true
      };
     case productsActions.DELETE_PRODUCT:
      return {
        ...state,
        productWasDeleted: false
      };
    case productsActions.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        productWasDeleted: true
      };
    case productsActions.REMOVE_PRODUCT_WAS_ADDED_OR_UPDATED:
      return {
        ...state,
        productWasAdded: false,
        productWasUpdated: false,
        addedProductId: null
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

    case productsActions.FETCH_PRODUCTS_FROM_STOCK:
      return {
        ...state,
        fetchProductsFromStockLoading: true
      };

   case productsActions.FETCH_PRODUCTS_FROM_STOCK_SUCCESS:
    return {
      ...state,
      fetchProductsFromStockLoading: false,
      productsFromStock: [...action.payload.productsFromStock],
      totalAmountStockProducts: parseInt(action.payload.totalAmount)
    };

    case productsActions.FETCH_SIZES_QUANTITY:
      return {
        ...state,
        fetchSizesQuantityLoading: true
      };

     case productsActions.FETCH_SIZES_QUANTITY_SUCCESS:
      return {
        ...state,
        fetchSizesQuantityLoading: false,
        sizesQuantity: [...action.payload.sizesQuantity]
      };

      case productsActions.GET_SIZES:
      return {
        ...state,
        getSizesLoading: true
      };

     case productsActions.GET_SIZES_SUCCESS:
      return {
        ...state,
        getSizesLoading: false,
        sizes: [...action.payload.sizes]
      };

     case productsActions.GET_AVAILABLE_SIZES:
      return {
        ...state,
        availableSizes: []
      };

      case productsActions.GET_AVAILABLE_SIZES_SUCCESS:
      return {
        ...state,
        availableSizes: [...action.payload.availableSizes]
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
    case productsActions.REMOVE_PRODUCT_WAS_DELETED:
      return {
        ...state,
        productWasDeleted: false
      };



    default:
      return state;
  }
}

