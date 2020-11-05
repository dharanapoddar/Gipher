import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Gif } from '../gif';
import { GifService } from '../services/gif.service';
import { RouterService } from '../services/router.service';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  gifs: Gif[];
  gifIds: String[];
  searchGifs: Gif[];
  gif: Gif = new Gif();
  errMessage: string;
  homepage_background: string;
  submitMessage: string;
  isDataLoaded: any;
  key = new FormControl('');
  constructor(private gifService: GifService, private routerService: RouterService) { }

  ngOnInit() {
    this.gifService.getGIFs().subscribe((gifs) => {

      this.gifs = gifs['data'];
      console.log(this.gifs);
      this.isDataLoaded = true;
    }, (error) => {
      this.errMessage = error.message;
    });

  }
}
