import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { GifService } from '../services/gif.service';
import { Gif } from '../gif';
import { RouterService } from '../services/router.service';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  token: any;
  valid: any;
  gifs: Gif[];
  errMessage: string;
  key = new FormControl('');
  searchField;
  path: string;

  constructor(private authenticationService: AuthenticationService, private gifService: GifService, private routerService: RouterService) {
    this.token = this.authenticationService.getBearerToken();
    if (this.token === null) {
      this.valid = false;
    }
    else {
      this.authenticationService.getEmitter().subscribe((valid) => {
        this.valid = valid
      });

    }

  }

  ngOnInit() {

  }

  clearSearchField() {
    this.searchField = '';
  }

  performSearch() {
    if (this.searchField !== '') {
      this.routerService.routeToSearch(this.searchField);
    }
    else {
      this.routerService.routeToDashboard();
      // this.gifService.getGIFs().subscribe((gifs) => {

      //   this.gifs = gifs['data'];
      //   console.log(this.gifs);
      // }, (error) => {
      //   this.errMessage = error.message;
      // });
    }

  }

}
