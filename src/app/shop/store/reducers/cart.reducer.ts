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
      var newData = changed.map(el => {
      if(el.product_id == action.payload.product.product_id.id && el.size == action.payload.product.size)
         return Object.assign({}, el, {amount:action.payload.amount})
      return el
      });
      return {
        ...state,
        addToCartLoading: false,
        isAddedToCart: true,
        error: null,
        cart: newData,
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
        // totalAmount: 0,
        totalNumberOfProducts: 0,
        getCartLoading: true,
        error: null
      };
    case cartActions.FETCH_CART_SUCCESS:
      return {
        ...state,
        getCartLoading: false,
        cart: [...action.payload.cart],
        // totalAmount: action.payload.totalAmount,
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
    case cartActions.GET_TOTAL_AMOUNT:
      return {
        ...state,
        error: null
      };
    case cartActions.GET_TOTAL_AMOUNT_SUCCESS:
      return {
        ...state,
        totalAmount: action.payload.totalAmount,
        error: null
      };
    case cartActions.GET_TOTAL_AMOUNT_FAILURE:
      return {
        ...state,
        error: action.payload.error
      };

    default:
      return state;
  }
}

