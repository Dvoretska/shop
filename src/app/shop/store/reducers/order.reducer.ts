import * as orderActions from '../actions/order.actions';

export class OrderState {
  constructor(
    public saveOrderLoading: boolean,
    public order_number: any
  ) { }
}

export const initialState: OrderState = {
  saveOrderLoading: false,
  order_number: null
};

export function orderReducer(state: OrderState = initialState, action: orderActions.orderActions) {
  switch(action.type) {
    case orderActions.SAVE_ORDER:
      return {
        ...state,
        saveOrderLoading: true
      };
    case orderActions.SAVE_ORDER_SUCCESS:

      return {
        ...state,
        order_number: action.payload.order_number,
        saveOrderLoading: false
      };
    case orderActions.SAVE_ORDER_FAILURE:
      return {
        ...state,
        saveOrderLoading: false
      };

    default:
      return state;
  }
}

