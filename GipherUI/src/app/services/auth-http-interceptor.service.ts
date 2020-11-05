import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpInterceptorService implements HttpInterceptor {
  token: any;
  username: any;
  constructor() {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    if (req.url.startsWith('http://localhost:8080/') && localStorage.getItem('bearerToken')) {
      this.token = localStorage.getItem('bearerToken');
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        }
      })
    }

    else if (req.url.startsWith('http://localhost:8095/') && localStorage.getItem('bearerToken')) {
      this.token = localStorage.getItem('bearerToken');

      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        },
      });
    }

    return next.handle(req);
    // return next.handle(req).pipe(

    //   retry(1),

    //   catchError((error: HttpErrorResponse) => {

    //     let errorMessage = '';

    //     if (error.error instanceof ErrorEvent) {

    //       // client-side error

    //       errorMessage = `Error: ${error.error.message}`;

    //     } else {

    //       // server-side error

    //       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;

    //     }
    //     // window.alert(errorMessage);

    //     return throwError(errorMessage);

    //   })

    // )



  }
}
