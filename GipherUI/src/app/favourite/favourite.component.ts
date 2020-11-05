import { Component, OnInit } from '@angular/core';
import { GifService } from '../services/gif.service';
import { Gif } from '../gif';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit {

  gifs: Gif[] = [];
  searchGifs: Gif[];
  gif: Gif = new Gif();
  errMessage: string;

  submitMessage: string;
  i: number = 0;
  gifids: string = '';
  gifIds: String[];
  isDataLoaded: any;

  constructor(private gifService: GifService) { }

  ngOnInit() {
    this.gifService.getUserFavouriteGIFs().subscribe((gifIds) => {
      for (let gifid of gifIds) {
        this.i++;
        this.gifids = this.gifids.concat(String(gifid));
        if (this.i != gifIds.length)
          this.gifids = this.gifids.concat(',');
        if (this.i == gifIds.length)
          this.gifService.getGIFsByIds(this.gifids).subscribe((gifs) => {
            this.gifs = gifs['data'];
          })
      }
      this.isDataLoaded = true;
    })
  }
}
