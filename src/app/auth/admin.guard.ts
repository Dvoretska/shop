import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
@Injectable()
export class AdminGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> {
    return this.authService.tokenVerify()
      .pipe(map((res)=>{
        if(res['user']['role'] !== 'admin') {
          this.router.navigate(['admin/login']);
          return false;
        }
        return true;
      },
      (err) => {
         this.router.navigate(['admin/login']);
          return false;
      })
      )
  }

}