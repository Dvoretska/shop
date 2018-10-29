import * as wishlistActions from '../actions/wishlist.actions';


export class WishlistState {
  constructor(
    public addToWishlistLoading: boolean,
    public wishlist: any[],
    public getWishlistLoading: boolean,
    public totalNumOfProductsInWishlist: number,
    public deleteFromWishlistLoading: boolean,
  ) { }
}

export const initialState: WishlistState = {
  addToWishlistLoading: false,
  wishlist: [],
  getWishlistLoading: false,
  totalNumOfProductsInWishlist: null,
  deleteFromWishlistLoading: false
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

     case wishlistActions.DELETE_PRODUCT_FROM_WISHLIST:
      return {
        ...state,
        deleteFromWishlistLoading: true
      };
    case wishlistActions.DELETE_PRODUCT_FROM_WISHLIST_SUCCESS:
      let changedArr = [...state.wishlist];
      let index = changedArr.findIndex(x => x.id == action.payload.id);
      return {
        ...state,
        wishlist: [...state.wishlist.slice(0, index), ...state.wishlist.slice(index + 1)],
        totalNumOfProductsInWishlist: action.payload.totalNumOfProductsInWishlist,
        deleteFromWishlistLoading: false
      };
    case wishlistActions.DELETE_PRODUCT_FROM_WISHLIST_FAILURE:
      return {
        ...state,
        deleteFromWishlistLoading: false
      };

    default:
      return state;
  }
}

