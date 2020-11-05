import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { RouterService } from '../services/router.service';
import { UserService } from '../services/user.service';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User();
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  submitMessage = '';

  bearerToken: any;

  constructor(private routerService: RouterService, private userService: UserService) { }

  ngOnInit() {
  }

  registerSubmit() {
    if (this.username.value !== '' && this.password.value !== '') {
      this.user.username = this.username.value;
      this.user.password = this.password.value;
      this.userService.addUser(this.user).subscribe(
        data => {
          this.routerService.routeToLogin('registered');
        },
        (err) => {
          if (err.status === 404) {
            console.log(err);
            this.submitMessage = err.message;
          } else {
            this.submitMessage = err.error.message;
          }
        }
      );

    }
    else {
      this.submitMessage = 'username and password both are required fields';
    }
  }
}
