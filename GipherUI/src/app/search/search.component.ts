import { Component, OnInit } from '@angular/core';
import { Gif } from '../gif';
import { GifService } from '../services/gif.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  gifs: Gif[];
  gifIds: String[];
  searchGifs: Gif[];
  gif: Gif = new Gif();
  errMessage: string;
  homepage_background: string;
  submitMessage: string;
  isDataLoaded: any;

  constructor(private gifService: GifService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.queryParams
      .subscribe(params => {
        if (params.key !== undefined) {
          this.gifService.recordSearch(params.key).subscribe((data) => { });
          this.gifService.performSearch(params.key).subscribe((gifs) => {
            console.log(gifs);
            this.gifs = gifs['data'];
            console.log('searchGifs' + this.searchGifs);
            this.isDataLoaded = true;

          }, (error) => {
            this.errMessage = error.message;
          });
        }

      });





  }

}
