import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Gif } from '../gif';
import { GifService } from '../services/gif.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  gifs: Gif[];
  gif: Gif = new Gif();
  errMessage: string;


  constructor(private gifService: GifService) { }

  ngOnInit() {
  }

}
