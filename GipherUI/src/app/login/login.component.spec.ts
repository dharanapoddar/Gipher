import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { throwError as observableThrowError, of as observableOf } from 'rxjs';
import { LoginComponent } from './login.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';
import { FormsModule, FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';

const testConfig = {
  error404: {
    message: 'Invalid Login! Please Login Again!',
    name: 'HttpErrorResponse',
    ok: false,
    status: 404,
    statusText: 'Not Found',
    url: 'http://localhost:8080/authenticate'
  },
  error403: {
    error: { message: 'Invalid Login! Please Login Again!' },
    message: 'Invalid Login! Please Login Again!',
    name: 'HttpErrorResponse',
    ok: false,
    status: 403,
    statusText: 'Forbidden',
    url: 'http://localhost:8080/authenticate'
  },
  positive: {
    token: 'token123'
  }
};

class ActivatedRouteMock {
  queryParams = new Observable(observer => {
    const urlParams = {
      registered: true,

    }
    observer.next(urlParams);
    observer.complete();
  });
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authenticationService: AuthenticationService;
  let positiveResponse: any;
  let loginComponent: LoginComponent;
  let spyAuthenticateUser: any;
  let spySetBearerToken: any;
  let spyRouteToDashboard: any;
  const routerSpy: any = {};
  let location: Location;
  let routerService: any;
  let errorMessage: any;
  let debugElement: any;
  let element: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientTestingModule, HttpClientModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteMock },
        { provide: Router, useValue: {} },
        { provide: Location, useValue: { back: () => { } } },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    location = TestBed.get(Location);
    loginComponent = fixture.componentInstance;
    authenticationService = fixture.debugElement.injector.get(AuthenticationService);
    routerService = fixture.debugElement.injector.get(RouterService);
    fixture.detectChanges();
  });



  it('should create', () => {
    expect(loginComponent).toBeTruthy();
  });

  it('should handle to login into the system', fakeAsync(() => {
    positiveResponse = testConfig.positive;
    spyAuthenticateUser = spyOn(authenticationService, 'authenticateUser').and.returnValue(observableOf(positiveResponse));
    const token = testConfig.positive.token;
    spySetBearerToken = spyOn(authenticationService, 'setBearerToken').and.callFake(() => {
      localStorage.setItem('bearerToken', token);
    });
    spyRouteToDashboard = spyOn(routerService, 'routeToDashboard').and.callFake(() => { });
    const username = new FormControl('stranger');
    loginComponent.username = username;
    const password = new FormControl('password');
    loginComponent.password = password;
    loginComponent.loginSubmit();
    expect(localStorage.getItem('bearerToken')).toBe(token, 'should get token from local storage');
  }));

  it('should handle error on login', fakeAsync(() => {
    errorMessage = testConfig.error403;
    loginComponent.submitMessage = ' ';
    fixture.detectChanges();
    debugElement = fixture.debugElement.query(By.css('.error-message'));
    spyAuthenticateUser = spyOn(authenticationService, 'authenticateUser').and.returnValue(observableThrowError(errorMessage));

    const username = new FormControl('stranger');
    loginComponent.username = username;
    const password = new FormControl('password');
    loginComponent.password = password;
    loginComponent.loginSubmit();

    tick();
    fixture.detectChanges();
    if (debugElement !== null) {
      element = debugElement.nativeElement;
      expect(element.textContent).toBe(errorMessage.error.message,
        `should store 'Invalid Login! Please Login Again!' in a varibale 'submitMessage' to show error on login page`);
    } else {
      expect(false).toBe(true,
        `should have an element  as  <label class='error-message'>{{submitMessage}}</label>
        in your login.component.html to show server errror response`);
    }
  }));



});
