import * as cartActions from '../actions/cart.actions';

export class CartState {
  constructor(
    public addToCartLoading: boolean,
    public isAddedToCart: boolean
  ) { }
}

export const initialState: CartState = {
  addToCartLoading: false,
  isAddedToCart: null
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
        error: null
      };
    case cartActions.ADD_PRODUCT_TO_CART_FAILURE:
      return {
        ...state,
        addToCartLoading: false,
        isAddedToCart: false,
        error: action.payload.error
      };
    default:
      return state;
  }
}

