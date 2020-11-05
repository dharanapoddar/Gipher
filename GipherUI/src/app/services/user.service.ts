import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  addUser(user: User): Observable<User> {
    return this.httpClient.post<User>('http://localhost:8080/register', user);
  }
}
