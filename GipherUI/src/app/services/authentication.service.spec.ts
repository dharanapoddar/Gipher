import { TestBed } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

describe('AuthenticationService', () => {
  let authenticationService: AuthenticationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
    });
    authenticationService = TestBed.get(AuthenticationService);
    httpMock = TestBed.get(HttpTestingController);

  });

  it('should be created', () => {
    const service: AuthenticationService = TestBed.get(AuthenticationService);
    expect(service).toBeTruthy();
  });

  it('should authenticate user and return token', () => {
    const mockData: any = { username: 'x', password: 'x' };
    authenticationService.authenticateUser(mockData).subscribe(
      data => expect(data).toBe('should return token'),
      fail
    );
    const req = httpMock.expectOne(authenticationService.authUrl + 'authenticate');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(mockData);
  });

  it('should return a resolved Promise', () => {
    const token: any = '';
    authenticationService.isUserAuthenticated(token).then((value) => {
      expect(value).toBe(true);
    });
  });

});
