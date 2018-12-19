import {Actions, Effect, ofType} from "@ngrx/effects";
import {Injectable} from "@angular/core";
import * as CategoriesActions from '../actions/categories.actions';
import * as ErrorsActions from '../actions/errors.actions';
import {exhaustMap, map, catchError, switchMap} from 'rxjs/operators';
import { of, from } from 'rxjs';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { environment } from 'src/environments/environment';
import {ToastrService} from "ngx-toastr";


@Injectable()
export class CategoriesEffects {

  constructor(private actions$: Actions, private http: HttpClient, private toastr: ToastrService) {}

  @Effect()
  addCategory= this.actions$
    .pipe(
      ofType(CategoriesActions.ADD_CATEGORY),
      map((action: CategoriesActions.AddCategory) => action.payload),
      exhaustMap((payload) =>
        this.http.post(`${environment.API_URL}/category/add`, payload).pipe(
          map((res)=>{
            return new CategoriesActions.AddCategorySuccess({
              category: res['category']
            });
          }),
          catchError(error => {
            return from([new ErrorsActions.LoadError(error)]);
          })
        )
      )
    );

  @Effect()
  fetchCategories = this.actions$
    .pipe(
      ofType(CategoriesActions.FETCH_CATEGORIES),
      switchMap(() =>
        this.http.get(`${environment.API_URL}/categories`).pipe(
          map((categories)=>{
            return new CategoriesActions.FetchCategoriesSuccess({categories});
          }),
          catchError(error => {
            return from([new ErrorsActions.LoadError(error)]);
          })
        )
      )
    );

  @Effect()
  fetchSubcategories = this.actions$
    .pipe(
      ofType(CategoriesActions.FETCH_SUBCATEGORIES),
      map((action: CategoriesActions.FetchSubcategories) => action.payload),
      switchMap((payload) =>
        this.http.get(`${environment.API_URL}/subcategories/${payload.category_id}`).pipe(
          map((subcategories)=>{
            return new CategoriesActions.FetchSubcategoriesSuccess({subcategories});
          }),
          catchError(error => {
            return from([new ErrorsActions.LoadError(error)]);
          })
        )
      )
    );

  @Effect()
  fetchCategoriesTree = this.actions$
    .pipe(
      ofType(CategoriesActions.FETCH_CATEGORIES_TREE),
      switchMap(() =>
        this.http.get(`${environment.API_URL}/categories-tree`).pipe(
          map((res)=>{
            return new CategoriesActions.FetchCategoriesTreeSuccess({categoriesTree: res['categoriesTree']});
          }),
          catchError(error => {
            return from([new ErrorsActions.LoadError(error)]);
          })
        )
      )
    );

  @Effect()
  deleteSubcategories = this.actions$
    .pipe(
      ofType(CategoriesActions.DELETE_SUBCATEGORIES),
      map((action: CategoriesActions.DeleteSubcategories) => action.payload),
      exhaustMap((payload)=> {
          let options = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
            }),
            body: payload,
          };
          return this.http.delete(`${environment.API_URL}/subcategories/delete`, options).pipe(
            map((res) => {
              return new CategoriesActions.DeleteSubcategoriesSuccess();
            }),
            catchError(error => {
              return from([new ErrorsActions.LoadError(error)]);
            })
          )
        }
      )
    );
}
