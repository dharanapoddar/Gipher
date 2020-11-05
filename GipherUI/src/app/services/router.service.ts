import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  constructor(public router: Router, private location: Location) { }

  routeToHome() {
    this.router.navigate(['home']);
  }

  routeToLogin(message: any) {
    if (message === 'registered') {
      this.router.navigate(['login'], { queryParams: { registered: 'true' } });
    } else if (message === 'loggedOut') {
      this.router.navigate(['login'], { queryParams: { loggedOut: 'true' } });
    } else {
      this.router.navigate(['login']);
    }
  }

  routeToDashboard() {
    this.router.navigate(['home/dashboard']);
  }

  routeToView(gifId) {
    this.router.navigate(['home', {
      outlets: {
        viewGIFOutlet: ['gif', gifId, 'view'],
      }
    }]);
  }

  routeToSearch(key) {
    this.router.navigate(['home/search'], { queryParams: { key: key } });
  }

  routeBack() {
    this.location.back();
  }



}
