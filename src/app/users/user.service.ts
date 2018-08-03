import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from './user.model';

@Injectable()
export class UserService {
  API_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    let errMsg: string;
    const err = error.message || JSON.stringify(error.error);
    errMsg = `${error.status} - ${error.statusText || ''} Details: ${err}`;
    return throwError(error);
  };

  getUsers() {
    return this.http.get(`${this.API_URL}/users`).pipe(
      catchError(this.handleError)
    );
  }

  createUser(email: string, password: string, selectedRole: string) {
    return this.http.post(`${this.API_URL}/create`,
    {email: email, password: password, userRole: selectedRole}).pipe(
      catchError(this.handleError)
    )
  }

  updateUser(savedData: FormData) {
    return this.http.post(`${this.API_URL}/update`, savedData).pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(email: string) {
     let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {email},
    };
    return this.http.delete(`${this.API_URL}/delete`, options).pipe(
      catchError(this.handleError)
    );
  }
}
