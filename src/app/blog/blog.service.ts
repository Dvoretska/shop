import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class BlogService {

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  };

  createPost(savedData: FormData) {
    return this.http.post(`${environment.API_URL}/create-post`, savedData).pipe(
      catchError(this.handleError)
    );
  }

  getPosts() {
    return this.http.get(`${environment.API_URL}/posts`).pipe(
      catchError(this.handleError)
    );
  }

  getPostDetails(id) {
    const params = new HttpParams().set('id', id);
    return this.http.get(`${environment.API_URL}/post`, {params}).pipe(
      catchError(this.handleError)
    );
  }

  addComment(text: string, id: number) {
    return this.http.post(`${environment.API_URL}/comment`, {text: text, post_id: id}).pipe(
      catchError(this.handleError)
    );
  }

  updateComment(text: string, id: number) {
    return this.http.post(`${environment.API_URL}/update-comment`, {text, id}).pipe(
      catchError(this.handleError)
    );
  }

  deleteComment(id: number) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {id}
    };
    return this.http.delete(`${environment.API_URL}/delete-comment`, options).pipe(
      catchError(this.handleError)
    );
  }

   deletePost(id: number) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {id}
    };
    return this.http.delete(`${environment.API_URL}/delete-post`, options).pipe(
      catchError(this.handleError)
    );
  }

  updatePost(savedData: FormData) {
    return this.http.post(`${environment.API_URL}/update-post`, savedData).pipe(
      catchError(this.handleError)
    );
  }

}
