import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authUrl: string;
  @Output() fireIsLoggedIn: EventEmitter<any> = new EventEmitter<any>();

  constructor(private httpClient: HttpClient) {
    this.authUrl = 'http://localhost:8080/';
  }

  authenticateUser(data: any): Observable<any> {
    return this.httpClient.post<any>(this.authUrl + 'authenticate', data).pipe(catchError(this.errorHandler));
  }

  setBearerToken(token: any) {
    localStorage.setItem('bearerToken', token);
  }

  getBearerToken(): any {
    return localStorage.getItem('bearerToken');
  }

  setuserName(username: any) {
    localStorage.setItem('userName', username);
  }

  getuserName(): any {
    return localStorage.getItem('userName');
  }

  isUserAuthenticated(token: any): Promise<boolean> {
    return this.httpClient.post<any>(`${this.authUrl}isAuthenticated`, {},
    ).pipe(map((res) => {
      if (res['isAuthenticated']) {
        this.fireIsLoggedIn.emit(true);
      } else {
        this.fireIsLoggedIn.emit(false);
      }
      return res['isAuthenticated'];
    })).toPromise();
  }

  logOut() {
    this.fireIsLoggedIn.emit(false);
    localStorage.removeItem('bearerToken');
    localStorage.removeItem('userName');

  }

  getEmitter() {
    return this.fireIsLoggedIn;
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message);
  }
}


