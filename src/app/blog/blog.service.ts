import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
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
    const params = new HttpParams()
      .set('id', id);
    return this.http.get(`${environment.API_URL}/post`, {params}).pipe(
      catchError(this.handleError)
    );
  }

}
