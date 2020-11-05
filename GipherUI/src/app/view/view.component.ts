import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Gif } from '../gif';
import { GifService } from '../services/gif.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})

export class ViewComponent implements OnInit {
  gif: Gif = new Gif();
  submitMessage = '';
  isDataLoaded: any;
  gifIds: String[];

  constructor(private matDialogRef: MatDialogRef<ViewComponent>, private routeService: RouterService,
    private gifService: GifService, @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit() {
    this.gifService.getGIFById(this.data.gif).subscribe((gif) => {
      this.gif = gif['data'];
      this.checkBookmarks();
      this.checkFavourites();
      this.isDataLoaded = true;
    }, (error) => {
      this.submitMessage = 'Error Loading GIF! Please try after some time';
    });
  }

  checkBookmarks() {
    this.gifService.getUserBookmarkGIFs().subscribe((gifIds) => {
      this.gifIds = gifIds;
      for (let gifid of gifIds) {
        if (this.gif.id === gifid) {
          this.gif.isBookmarked = true;
        }
      }
    });
  }

  checkFavourites() {
    this.gifService.getUserFavouriteGIFs().subscribe((gifIds) => {
      this.gifIds = gifIds;
      for (let gifid of gifIds) {

        if (this.gif.id === gifid) {
          this.gif.isFavourite = true;
        }

      }
    });
  }

  ngOnDestroy() {
    this.routeService.routeBack();
  }


}
