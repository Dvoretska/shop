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

export const SAVE_ADDITIONAL_SUBCATEGORIES = 'SAVE_ADDITIONAL_SUBCATEGORIES';
export const SAVE_ADDITIONAL_SUBCATEGORIES_SUCCESS = 'SAVE_ADDITIONAL_SUBCATEGORIES_SUCCESS';

export const REMOVE_CATEGORY_WAS_ADDED = 'REMOVE_CATEGORY_WAS_ADDED';

export const REMOVE_SUBCATEGORY_WAS_ADDED = 'REMOVE_SUBCATEGORY_WAS_ADDED';

export class AddCategory implements Action {
  readonly type = ADD_CATEGORY;

  constructor(public payload: {category: string, subcategory: string}) {}
}

export class AddCategorySuccess implements Action {
  readonly type = ADD_CATEGORY_SUCCESS;

  constructor() {}
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

  constructor(public payload: string) {}
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

  constructor(public payload: {subcategories: string}) {}
}

export class DeleteSubcategoriesSuccess implements Action {
  readonly type = DELETE_SUBCATEGORIES_SUCCESS;

  constructor() {}
}

// _____________________________________________________

export class SaveAdditionalSubcategory implements Action {
  readonly type = SAVE_ADDITIONAL_SUBCATEGORIES;

  constructor(public payload: {category_id: string, subcategory: string}) {}
}

export class SaveAdditionalSubcategorySuccess implements Action {
  readonly type = SAVE_ADDITIONAL_SUBCATEGORIES_SUCCESS;

  constructor(public payload: {subcategory: any}) {}
}

// _____________________________________________________

export class RemoveCategoryWasAdded implements Action {
  readonly type = REMOVE_CATEGORY_WAS_ADDED;

  constructor() {}
}

// _____________________________________________________

export class RemoveSubcategoryWasAdded implements Action {
  readonly type = REMOVE_SUBCATEGORY_WAS_ADDED;

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
  FetchCategoriesSuccess |
  SaveAdditionalSubcategory |
  SaveAdditionalSubcategorySuccess |
  RemoveCategoryWasAdded |
  RemoveSubcategoryWasAdded;
