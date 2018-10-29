import * as wishlistActions from '../actions/wishlist.actions';


export class WishlistState {
  constructor(
    public addToWishlistLoading: boolean,
    public wishlist: any[],
    public getWishlistLoading: boolean,
    public totalNumOfProductsInWishlist: number
  ) { }
}

export const initialState: WishlistState = {
  addToWishlistLoading: false,
  wishlist: [],
  getWishlistLoading: false,
  totalNumOfProductsInWishlist: null
};

export function wishlistReducer(state: WishlistState = initialState, action: wishlistActions.wishlistActions) {
  switch(action.type) {
    case wishlistActions.ADD_PRODUCT_TO_WISHLIST:
      return {
        ...state,
        addToWishlistLoading: true
      };
    case wishlistActions.ADD_PRODUCT_TO_WISHLIST_SUCCESS:
      return {
        ...state,
        wishlist: state.wishlist.concat(action.payload.item),
        addToWishlistLoading: false
      };
    case wishlistActions.ADD_PRODUCT_TO_WISHLIST_FAILURE:
      return {
        ...state,
        addToWishlistLoading: false
      };

    case wishlistActions.FETCH_WISHLIST:
      return {
        ...state,
        totalNumOfProductsInWishlist: 0,
        getWishlistLoading: true
      };
    case wishlistActions.FETCH_WISHLIST_SUCCESS:
      return {
        ...state,
        getWishlistLoading: false,
        wishlist: [...action.payload.wishlist],
        totalNumOfProductsInWishlist: action.payload.totalNumOfProductsInWishlist
      };
    case wishlistActions.FETCH_WISHLIST_FAILURE:
      return {
        ...state,
        getWishlistLoading: false
      };

    default:
      return state;
  }
}

