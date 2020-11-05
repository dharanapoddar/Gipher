import { Component, OnInit } from '@angular/core';
import { RouterService } from '../services/router.service';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private routerService: RouterService, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.logOut();
    this.routerService.routeToLogin('loggedOut');
  }

}
