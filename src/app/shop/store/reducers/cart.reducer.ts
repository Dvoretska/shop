import * as cartActions from '../actions/cart.actions';
import {REMOVE_IS_ADDED_TO_CART} from "../actions/cart.actions";

export class CartState {
  constructor(
    public addToCartLoading: boolean,
    public isAddedToCart: boolean,
    public quantity: number
  ) { }
}

export const initialState: CartState = {
  addToCartLoading: false,
  isAddedToCart: null,
  quantity: 0
};

export function cartReducer(state: CartState =initialState, action: cartActions.cartActions) {
  switch(action.type) {
    case cartActions.ADD_PRODUCT_TO_CART:
      return {
        ...state,
        addToCartLoading: true,
        isAddedToCart: null,
        error: null
      };
    case cartActions.ADD_PRODUCT_TO_CART_SUCCESS:
      return {
        ...state,
        addToCartLoading: false,
        isAddedToCart: true,
        quantity: action.payload.quantity,
        error: null
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
    default:
      return state;
  }
}

