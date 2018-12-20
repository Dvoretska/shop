import * as categoriesActions from '../actions/categories.actions';
import {ADD_CATEGORY} from "../actions/categories.actions";
import {SAVE_ADDITIONAL_SUBCATEGORIES} from "../actions/categories.actions";
import {SAVE_ADDITIONAL_SUBCATEGORIES_SUCCESS} from "../actions/categories.actions";
import * as productsActions from "../actions/products.actions";


export class CategoriesState {
  constructor(
    public categories: any[],
    public subcategories: any,
    public categoriesTree: any[],
    public categoryWasAdded: boolean
  ) { }
}


export const initialState: CategoriesState = {
  categories: [],
  subcategories: [],
  categoriesTree: [],
  categoryWasAdded: false
};

export function categoriesReducer(state: CategoriesState =initialState, action: categoriesActions.categoriesActions) {
  switch(action.type) {
    case categoriesActions.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload.categories
      };

    case categoriesActions.FETCH_SUBCATEGORIES:
      return {
        ...state,
        subcategories: []
      };

    case categoriesActions.FETCH_SUBCATEGORIES_SUCCESS:
      return {
        ...state,
        subcategories: action.payload.subcategories
      };

    case categoriesActions.FETCH_CATEGORIES_TREE:
      return {
        ...state,
        categoriesTree: []
      };

    case categoriesActions.FETCH_CATEGORIES_TREE_SUCCESS:
      return {
        ...state,
        categoriesTree: action.payload.categoriesTree
      };

    case categoriesActions.ADD_CATEGORY:
      return {
        ...state,
        categoryWasAdded: false
      };

    case categoriesActions.ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        categoryWasAdded: true
      };

    case categoriesActions.REMOVE_CATEGORY_WAS_ADDED:
      return {
        ...state,
        categoryWasAdded: false
      };


    default:
      return state;
  }
}

