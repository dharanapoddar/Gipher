import { TestBed } from '@angular/core/testing';

import { AuthHttpInterceptorService } from './auth-http-interceptor.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GifService } from './gif.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


describe('AuthHttpInterceptorService', () => {

  let gifService: GifService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        GifService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthHttpInterceptorService,
          multi: true,
        },
      ],
    })
    gifService = TestBed.get(GifService);
    httpMock = TestBed.get(HttpTestingController);
    localStorage.setItem('bearerToken', 'x');
    localStorage.setItem('userName', 'x');
  });

  it('should be created', () => {
    const service: AuthHttpInterceptorService = TestBed.get(AuthHttpInterceptorService);
    expect(service).toBeTruthy();
  });

  it('should add an Authorization header', () => {
    gifService.getUserFavouriteGIFs().subscribe(response => {
      expect(response).toBeTruthy();
    });
    const httpRequest = httpMock.expectOne('http://localhost:8095/getUserFavouriteGIFs');
    expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
  });

});
