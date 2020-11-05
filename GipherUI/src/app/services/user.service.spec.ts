import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { User } from '../user';

describe('UserService', () => {
  let httpMock: HttpTestingController;
  let service: UserService;
  let user: User;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [UserService]

    });
    service = TestBed.get(UserService);
    httpMock = TestBed.get(HttpTestingController);

  });

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  it('should register user ', () => {

    user = { id: 1, username: 'xyz', password: 'xyz' };
    service.addUser(user).subscribe(
      data => expect(data).toBe(user),
      fail
    );
    const req = httpMock.expectOne('http://localhost:8080/register');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(user);
  });

});
