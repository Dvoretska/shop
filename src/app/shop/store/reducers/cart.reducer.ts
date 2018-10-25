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
    public productQty: number,
    public amount: number
  ) { }
}

export const initialState: CartState = {
  addToCartLoading: false,
  isAddedToCart: null,
  getCartLoading: false,
  cart: [],
  totalAmount: null,
  totalNumberOfProducts: 0,
  productQty: null,
  amount: null
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
      let changed = [...state.cart];
      let newData = changed.map(el => {
      if(el.product_id == action.payload.product.product_id.id && el.size == action.payload.product.size)
         return Object.assign({}, el, {amount:action.payload.amount}, {quantity: action.payload.quantity});
      return el;
      });
      return {
        ...state,
        addToCartLoading: false,
        isAddedToCart: true,
        error: null,
        cart: newData,
        totalAmount: action.payload.totalAmount,
        productQty: action.payload.quantity,
        totalNumberOfProducts: action.payload.totalNumberOfProducts
      };
    case cartActions.ADD_PRODUCT_TO_CART_FAILURE:
      return {
        ...state,
        addToCartLoading: false,
        isAddedToCart: false,
        totalAmount: null,
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
        totalNumberOfProducts: 0,
        getCartLoading: true,
        error: null
      };
    case cartActions.FETCH_CART_SUCCESS:
      return {
        ...state,
        getCartLoading: false,
        cart: [...action.payload.cart],
        totalNumberOfProducts: action.payload.totalNumberOfProducts,
        totalAmount: action.payload.totalAmount,
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

