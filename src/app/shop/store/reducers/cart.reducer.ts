import * as cartActions from '../actions/cart.actions';


export class CartState {
  constructor(
    public addToCartLoading: boolean,
    public isAddedToCart: boolean,
    public getCartLoading: boolean,
    public cart: any[],
    public totalAmount: number,
    public totalNumberOfProducts: number,
    public productQty: number,
    public amount: number,
    public deleteProductFromCartLoading: boolean,
    public updateCartLoading: boolean,
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
  amount: null,
  deleteProductFromCartLoading: false,
  updateCartLoading: false
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
    case cartActions.DELETE_PRODUCT_FROM_CART:
      return {
        ...state,
        deleteProductFromCartLoading: true,
        error: null
      };
    case cartActions.DELETE_PRODUCT_FROM_CART_SUCCESS:
      let changedArr = [...state.cart];
      let index = changedArr.findIndex(x => x.product_id == action.payload.product_id && x.size == action.payload.size);
      return {
        ...state,
        cart: [...state.cart.slice(0, index), ...state.cart.slice(index + 1)],
        deleteProductFromCartLoading: false,
        totalNumberOfProducts: action.payload.totalNumberOfProducts,
        totalAmount: action.payload.totalAmount,
        error: null
      };
    case cartActions.DELETE_PRODUCT_FROM_CART_FAILURE:
      return {
        ...state,
        deleteProductFromCartLoading: false,
        error: action.payload.error
      };

    case cartActions.DECREASE_QUANTITY_OF_PRODUCT_IN_CART:
      return {
        ...state,
        updateCartLoading: true,
        error: null
      };
    case cartActions.DECREASE_QUANTITY_OF_PRODUCT_IN_CART_SUCCESS:
      let changedCart = [...state.cart];
      let newCart = changedCart.map(el => {
        if(el.product_id == action.payload.product.product_id.id && el.size == action.payload.product.size)
          return Object.assign({}, el, {amount:action.payload.amount}, {quantity: action.payload.quantity});
        return el;
      });
      return {
        ...state,
        updateCartLoading: false,
        error: null,
        cart: newCart,
        totalAmount: action.payload.totalAmount,
        productQty: action.payload.quantity,
        totalNumberOfProducts: action.payload.totalNumberOfProducts
      };
    case cartActions.DECREASE_QUANTITY_OF_PRODUCT_IN_CART_FAILURE:
      return {
        ...state,
        updateCartLoading: false,
        totalAmount: null,
        error: action.payload.error
      };
    case cartActions.CLEAR_CART:
      return initialState;

    default:
      return state;
  }
}

