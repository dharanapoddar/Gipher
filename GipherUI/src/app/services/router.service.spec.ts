import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterService } from './router.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

class ActivatedRouteMock {
  queryParams = new Observable(observer => {
    const urlParams = {
      registered: true,

    };
    observer.next(urlParams);
    observer.complete();
  });
}

let router = {
  navigate: jasmine.createSpy('navigate')
};

describe('RouterService', () => {
  let authenticationService: AuthenticationService;
  let service: RouterService;
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let debugElement: DebugElement;
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [LoginComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
      { provide: ActivatedRoute, useClass: ActivatedRouteMock },
      { provide: Router, useValue: router },
      { provide: Location, useValue: { back: () => { } } },
    ],
    imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule, HttpClientModule]
  }));

  beforeEach(() => {
    authenticationService = TestBed.get(AuthenticationService);
    service = TestBed.get(RouterService);

    const fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should be created', () => {
    const service: RouterService = TestBed.get(RouterService);
    expect(service).toBeTruthy();
  });

  it(`should navigate to view`, () => {
    service.routeToView('xyz');
    expect(router.navigate).toHaveBeenCalledWith(['home', Object({ outlets: Object({ viewGIFOutlet: ['gif', 'xyz', 'view'] }) })]);
  });


  it(`should navigate to Dashboard`, () => {
    const mockData: any = { username: 'x', password: 'x' }
    component.loginSubmit();
    authenticationService.authenticateUser(mockData).subscribe(
      data => {
        expect(data).toBe('should return token'),
          expect(router.navigate).toHaveBeenCalledWith(['home/dashboard']);
      },
      fail

    );

  });

  it(`should navigate to Search`, () => {
    service.routeToSearch('xyz');
    expect(router.navigate).toHaveBeenCalledWith(['home/search'], Object({ queryParams: Object({ key: 'xyz' }) }));
  });

  it(`should navigate to home`, () => {
    service.routeToHome();
    expect(router.navigate).toHaveBeenCalledWith(['home']);
  });

  it(`should navigate to login without queryparam`, () => {
    service.routeToLogin('');
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });

  it(`should route back`, () => {
    expect(service.routeBack).toBeDefined();
  });


});
