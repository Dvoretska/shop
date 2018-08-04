import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  };

  getUsers() {
    return this.http.get(`${environment.API_URL}/users`).pipe(
      catchError(this.handleError)
    );
  }

  createUser(email: string, password: string, selectedRole: string) {
    return this.http.post(`${environment.API_URL}/create`,
    {email: email, password: password, userRole: selectedRole}).pipe(
      catchError(this.handleError)
    )
  }

  updateUser(savedData: FormData) {
    return this.http.post(`${environment.API_URL}/update`, savedData).pipe(
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
    return this.http.delete(`${environment.API_URL}/delete`, options).pipe(
      catchError(this.handleError)
    );
  }
}
