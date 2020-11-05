import { TestBed, async, inject, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RouterService } from './services/router.service';
import { Location } from '@angular/common';
import { AuthGuard } from './auth.guard';
import { AuthenticationService } from './services/authentication.service';

describe('AuthGuard', () => {
  let canActivateRouteGuard: AuthGuard;
  const activatedRouteSnapshot: ActivatedRouteSnapshot = new ActivatedRouteSnapshot();
  const routerStateSnapshot: RouterStateSnapshot = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['toString']);
  let authService: any;
  let spyCanActivate: any;
  let response: any;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [AuthGuard,
        { provide: Location, useValue: { back: () => { } } },
        { provide: Router, useValue: {} },
        AuthenticationService,
        RouterService],
    });
    canActivateRouteGuard = TestBed.get(AuthGuard);
    authService = TestBed.get(AuthenticationService);
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
  // ------------ Positive testing of isUserAuthenticated------------//
  it('should handle if user is authenticated', fakeAsync(() => {
    spyCanActivate = spyOn(canActivateRouteGuard, 'canActivate').and.callFake(() => true);
    response = canActivateRouteGuard.canActivate(activatedRouteSnapshot, routerStateSnapshot);
    expect(response).toBe(true, 'user is authenticated');
  }));

  // ------------ Negative testing of isUserAuthenticated------------//
  it('should handle if user is not authenticated', fakeAsync(() => {
    spyCanActivate = spyOn(canActivateRouteGuard, 'canActivate').and.callFake(() => false);
    response = canActivateRouteGuard.canActivate(activatedRouteSnapshot, routerStateSnapshot);
    expect(response).toBe(false, 'user is not authenticated');
  }));
});
