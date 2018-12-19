import { Action } from '@ngrx/store';

export const ADD_CATEGORY = 'ADD_CATEGORY';
export const ADD_CATEGORY_SUCCESS = 'ADD_CATEGORY_SUCCESS';

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';

export const FETCH_SUBCATEGORIES = 'FETCH_SUBCATEGORIES';
export const FETCH_SUBCATEGORIES_SUCCESS = 'FETCH_SUBCATEGORIES_SUCCESS';

export const FETCH_CATEGORIES_TREE = 'FETCH_CATEGORIES_TREE';
export const FETCH_CATEGORIES_TREE_SUCCESS = 'FETCH_CATEGORIES_TREE_SUCCESS';

export const DELETE_SUBCATEGORIES = 'DELETE_SUBCATEGORIES';
export const DELETE_SUBCATEGORIES_SUCCESS = 'DELETE_SUBCATEGORIES_SUCCESS';


export class AddCategory implements Action {
  readonly type = ADD_CATEGORY;

  constructor(public payload: {category: string}) {}
}

export class AddCategorySuccess implements Action {
  readonly type = ADD_CATEGORY_SUCCESS;

  constructor(public payload: {category: string}) {}
}

// _____________________________________________________

export class FetchCategories implements Action {
  readonly type = FETCH_CATEGORIES;

  constructor() {}
}

export class FetchCategoriesSuccess implements Action {
  readonly type = FETCH_CATEGORIES_SUCCESS;

  constructor(public payload: {categories: any}) {}
}

// _____________________________________________________

export class FetchSubcategories implements Action {
  readonly type = FETCH_SUBCATEGORIES;

  constructor(public payload: {category_id: number}) {}
}

export class FetchSubcategoriesSuccess implements Action {
  readonly type = FETCH_SUBCATEGORIES_SUCCESS;

  constructor(public payload: {subcategories: any}) {}
}

// _____________________________________________________

export class FetchCategoriesTree implements Action {
  readonly type = FETCH_CATEGORIES_TREE;

  constructor() {}
}

export class FetchCategoriesTreeSuccess implements Action {
  readonly type = FETCH_CATEGORIES_TREE_SUCCESS;

  constructor(public payload: {categoriesTree: any}) {}
}

// _____________________________________________________

export class DeleteSubcategories implements Action {
  readonly type = DELETE_SUBCATEGORIES;

  constructor(public payload: {subcategories: any[]}) {}
}

export class DeleteSubcategoriesSuccess implements Action {
  readonly type = DELETE_SUBCATEGORIES_SUCCESS;

  constructor() {}
}



export type categoriesActions =
  AddCategory |
  AddCategorySuccess |
  FetchSubcategories |
  FetchSubcategoriesSuccess |
  FetchCategoriesTree |
  FetchCategoriesTreeSuccess |
  DeleteSubcategories |
  DeleteSubcategoriesSuccess |
  FetchCategories |
  FetchCategoriesSuccess;
