import * as cartActions from '../actions/cart.actions';


export class CartState {
  constructor(
    public addToCartLoading: boolean,
    public isAddedToCart: boolean,
    public getCartLoading: boolean,
    public cart: any[],
    public message: string,
    public totalAmount: number,
    public totalNumOfProductsInCart: number,
    public productQty: number,
    public amount: number,
    public deleteFromCartLoading: boolean,
    public decreaseCartLoading: boolean,
  ) { }
}

export const initialState: CartState = {
  addToCartLoading: false,
  isAddedToCart: null,
  getCartLoading: false,
  cart: [],
  message: '',
  totalAmount: null,
  totalNumOfProductsInCart: 0,
  productQty: null,
  amount: null,
  deleteFromCartLoading: false,
  decreaseCartLoading: false
};

export function cartReducer(state: CartState =initialState, action: cartActions.cartActions) {
  switch(action.type) {
    case cartActions.ADD_PRODUCT_TO_CART:
      return {
        ...state,
        message: '',
        addToCartLoading: true,
        isAddedToCart: null
      };
    case cartActions.ADD_PRODUCT_TO_CART_SUCCESS:
      let changed = [...state.cart];
      let newData = changed.map(el => {
      if(el.id == action.payload.product.id)
         return Object.assign({}, el, {amount:action.payload.amount}, {quantity: action.payload.quantity});
      return el;
      });
      return {
        ...state,
        addToCartLoading: false,
        isAddedToCart: true,
        cart: newData,
        totalAmount: action.payload.totalAmount,
        productQty: action.payload.quantity,
        totalNumOfProductsInCart: action.payload.totalNumberOfProducts
      };
     case cartActions.OUT_OF_STOCK_CART:
      return {
        ...state,
        addToCartLoading: false,
        isAddedToCart: false,
        message: action.payload.message
      };
    case cartActions.ADD_PRODUCT_TO_CART_FAILURE:
      return {
        ...state,
        addToCartLoading: false,
        isAddedToCart: false,
        totalAmount: null
      };
    case cartActions.REMOVE_IS_ADDED_TO_CART:
      return {
        ...state,
        isAddedToCart: null
      };
    case cartActions.FETCH_CART:
      return {
        ...state,
        totalNumOfProductsInCart: 0,
        getCartLoading: true
      };
    case cartActions.FETCH_CART_SUCCESS:
      return {
        ...state,
        getCartLoading: false,
        cart: [...action.payload.cart],
        totalNumOfProductsInCart: action.payload.totalNumberOfProducts,
        totalAmount: action.payload.totalAmount,
      };
    case cartActions.FETCH_CART_FAILURE:
      return {
        ...state,
        getCartLoading: false
      };
    case cartActions.DELETE_PRODUCT_FROM_CART:
      return {
        ...state,
        deleteFromCartLoading: true
      };
    case cartActions.DELETE_PRODUCT_FROM_CART_SUCCESS:
      let changedArr = [...state.cart];
      let index = changedArr.findIndex(x => x.id == action.payload.id);
      return {
        ...state,
        cart: [...state.cart.slice(0, index), ...state.cart.slice(index + 1)],
        deleteFromCartLoading: false,
        totalNumOfProductsInCart: action.payload.totalNumberOfProducts,
        totalAmount: action.payload.totalAmount
      };
    case cartActions.DELETE_PRODUCT_FROM_CART_FAILURE:
      return {
        ...state,
        deleteFromCartLoading: false
      };

    case cartActions.DECREASE_QUANTITY_OF_PRODUCT_IN_CART:
      return {
        ...state,
        message: '',
        decreaseCartLoading: true
      };
    case cartActions.DECREASE_QUANTITY_OF_PRODUCT_IN_CART_SUCCESS:
      let changedCart = [...state.cart];
      let newCart = changedCart.map(el => {
        if(el.product_id == +action.payload.product.product_id && el.size_id == +action.payload.product.size_id)
          return Object.assign({}, el, {amount:action.payload.amount}, {quantity: action.payload.quantity});
        return el;
      });
      return {
        ...state,
        decreaseCartLoading: false,
        cart: newCart,
        totalAmount: action.payload.totalAmount,
        productQty: action.payload.quantity,
        totalNumOfProductsInCart: action.payload.totalNumberOfProducts
      };
    case cartActions.DECREASE_QUANTITY_OF_PRODUCT_IN_CART_FAILURE:
      return {
        ...state,
        decreaseCartLoading: false,
        totalAmount: null
      };
    case cartActions.GET_TOTAL_NUMBER_OF_PRODUCTS_SUCCESS:
      return {
        ...state,
        totalNumOfProductsInCart: action.payload.totalNumberOfProducts
      };

    case cartActions.CLEAR_CART:
      return initialState;

    default:
      return state;
  }
}

