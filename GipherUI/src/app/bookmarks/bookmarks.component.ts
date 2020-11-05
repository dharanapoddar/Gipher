import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Gif } from '../gif';
import { GifService } from '../services/gif.service';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit {

  gifs: Gif[] = [];
  searchGifs: Gif[];
  gif: Gif = new Gif();
  errMessage: string;
  homepage_background: string;
  submitMessage: string;
  i: any = 0;
  gifids = '';
  key = new FormControl('');
  gifIds: String[];
  isDataLoaded: any;

  constructor(private gifService: GifService) { }

  ngOnInit() {
    this.gifService.getUserBookmarkGIFs().subscribe((gifIds) => {

      for (const gifid of gifIds) {
        this.i++;
        this.gifids = this.gifids.concat(String(gifid));
        if (this.i !== gifIds.length) {
          this.gifids = this.gifids.concat(',');
        }
        if (this.i === gifIds.length) {
          this.gifService.getGIFsByIds(this.gifids).subscribe((gifs) => {
            this.gifs = gifs['data'];
          });
        }
      }
      this.isDataLoaded = true;
    });
  }
}
