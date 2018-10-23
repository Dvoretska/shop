import * as cartActions from '../actions/cart.actions';
import {CLEAR_CART} from "../actions/cart.actions";


export class CartState {
  constructor(
    public addToCartLoading: boolean,
    public isAddedToCart: boolean,
    public getCartLoading: boolean,
    public cart: any[],
    public totalAmount: number,
    public totalNumberOfProducts: number,
    public productQty: number
  ) { }
}

export const initialState: CartState = {
  addToCartLoading: false,
  isAddedToCart: null,
  getCartLoading: false,
  cart: [],
  totalAmount: 0,
  totalNumberOfProducts: 0,
  productQty: null
};

export function cartReducer(state: CartState =initialState, action: cartActions.cartActions) {
  switch(action.type) {
    case cartActions.ADD_PRODUCT_TO_CART:
      return {
        ...state,
        addToCartLoading: true,
        isAddedToCart: null,
        error: null,
        totalNumberOfProducts: action.payload.totalNumber
      };
    case cartActions.ADD_PRODUCT_TO_CART_SUCCESS:
      return {
        ...state,
        addToCartLoading: false,
        isAddedToCart: true,
        error: null,
        productQty: action.payload.quantity
      };
    case cartActions.ADD_PRODUCT_TO_CART_FAILURE:
      return {
        ...state,
        addToCartLoading: false,
        isAddedToCart: false,
        error: action.payload.error
      };
    case cartActions.REMOVE_IS_ADDED_TO_CART:
      return {
        ...state,
        isAddedToCart: null
      };
    case cartActions.FETCH_CART:
      return {
        ...state,
        totalAmount: 0,
        totalNumberOfProducts: 0,
        getCartLoading: true,
        error: null
      };
    case cartActions.FETCH_CART_SUCCESS:
      return {
        ...state,
        getCartLoading: false,
        cart: [...action.payload.cart],
        totalAmount: action.payload.totalAmount,
        totalNumberOfProducts: action.payload.totalNumberOfProducts,
        error: null
      };
    case cartActions.FETCH_CART_FAILURE:
      return {
        ...state,
        getCartLoading: false,
        error: action.payload.error
      };
    case cartActions.CLEAR_CART:
      return initialState;
    default:
      return state;
  }
}
