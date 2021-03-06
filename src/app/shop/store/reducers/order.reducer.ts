import * as orderActions from '../actions/order.actions';

export class OrderState {
  constructor(
    public saveOrderLoading: boolean,
    public fetchOrderLoading: boolean,
    public fetchOrdersLoading: boolean,
    public order_number: number,
    public order: any,
    public orders: any
  ) { }
}

export const initialState: OrderState = {
  saveOrderLoading: false,
  fetchOrderLoading: false,
  fetchOrdersLoading: false,
  order_number: null,
  order: null,
  orders: []
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
    case orderActions.FETCH_ORDER:
      return {
        ...state,
        fetchOrderLoading: true
      };
    case orderActions.FETCH_ORDER_SUCCESS:
      return {
        ...state,
        order: action.payload.order,
        fetchOrderLoading: false
      };

    case orderActions.FETCH_ORDERS:
      return {
        ...state,
        fetchOrdersLoading: true
      };
    case orderActions.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload.orders,
        fetchOrdersLoading: false
      };

    default:
      return state;
  }
}

