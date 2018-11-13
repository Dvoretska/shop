import * as orderActions from '../actions/order.actions';

export class OrderState {
  constructor(
    public addToCartLoading: boolean
  ) { }
}

export const initialState: OrderState = {
  addToCartLoading: false
};

export function orderReducer(state: OrderState =initialState, action: orderActions.orderActions) {
  switch(action.type) {
    case orderActions.SAVE_ORDER:
      return {
        ...state,

      };
    case orderActions.SAVE_ORDER_SUCCESS:

      return {
        ...state,

      };
    case orderActions.SAVE_ORDER_FAILURE:
      return {
        ...state,

      };

    default:
      return state;
  }
}

