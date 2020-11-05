import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { RouterService } from '../services/router.service';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  submitMessage = '';
  bearerToken: any;
  infoMessage = '';

  constructor(private routerService: RouterService, private authenticationService: AuthenticationService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        if (params.registered !== undefined && params.registered === 'true') {
          this.infoMessage = 'Registration Successful! Please Login!';
        }
        else if (params.loggedOut !== undefined && params.loggedOut === 'true') {
          this.infoMessage = 'You have been logged Out! Please Login!';
        }
      });
  }


  loginSubmit() {
    if (this.username.value !== '' && this.password.value !== '') {
      this.authenticationService.authenticateUser({ username: this.username.value, password: this.password.value }).subscribe((data) => {
        this.bearerToken = data['token'];
        this.authenticationService.setBearerToken(this.bearerToken);
        this.routerService.routeToDashboard();
        this.authenticationService.setuserName(this.username.value);
      }, (err) => {
        this.submitMessage = 'Invalid Login! Please Login Again!';
        this.infoMessage = '';

      });
    }
    else {
      this.submitMessage = 'username and password both are required fields';
      this.infoMessage = '';
    }
  }

}
