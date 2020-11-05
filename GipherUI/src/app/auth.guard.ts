import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';
import { RouterService } from './services/router.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  token: any;
  constructor(
    private authenticationService: AuthenticationService,
    private routerService: RouterService
  ) {

  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    this.token = this.authenticationService.getBearerToken();
    console.log(this.token);
    if (this.token === null) {
      this.routerService.routeToLogin('No token available');
    } else {
      return this.authenticationService
        .isUserAuthenticated(this.token)
        .then((status) => {

          console.log(status);

          const valid = status;
          if (!valid) {
            this.routerService.routeToLogin('Not Auntenticated');
          }

          return valid;
        },
          (error) => {
            this.routerService.routeToLogin('Not Auntenticated');
          });
    }
  }
}
