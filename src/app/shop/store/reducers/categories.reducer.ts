import * as categoriesActions from '../actions/categories.actions';
import {ADD_CATEGORY} from "../actions/categories.actions";


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

    case categoriesActions.ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        categoryWasAdded: true,
        categoriesTree: state.categoriesTree.concat(action.payload.category),
      };

    default:
      return state;
  }
}

