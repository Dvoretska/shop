import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  };

  signupUser(email: string, password: string) {
    return this.http.post(`${environment.API_URL}/register`,
      {email: email, password: password}).pipe(
        catchError(this.handleError)
    )
  }
  loginUser(email: string, password: string) {
    return this.http.post(`${environment.API_URL}/login`,
      {email: email, password: password}).pipe(
        catchError(this.handleError)
    )
  }

  isAuthenticated() {
    let user = JSON.parse(localStorage.getItem('user'));
    return !!user && !!user.token;
  }
}
