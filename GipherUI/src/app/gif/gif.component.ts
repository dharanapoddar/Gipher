import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Gif } from '../gif';
import { GifService } from '../services/gif.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-gif',
  templateUrl: './gif.component.html',
  styleUrls: ['./gif.component.css']
})
export class GifComponent implements OnInit {
  @Input()
  gif: Gif;

  submitMessage: string;
  path: any;
  isDataLoaded: any;
  gifIds: any;
  button: any;

  constructor(private gifService: GifService, private routerService: RouterService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.checkBookmarks();
    this.checkFavourites();
    this.isDataLoaded = true;
  }
  checkBookmarks() {
    this.gifService.getUserBookmarkGIFs().subscribe((gifIds) => {
      this.gifIds = gifIds;
      for (let gifid of gifIds) {
        if (this.gif.id === gifid) {
          this.gif.isBookmarked = true;
        }
      }
    })
  }

  checkFavourites() {
    this.gifService.getUserFavouriteGIFs().subscribe((gifIds) => {
      this.gifIds = gifIds;
      for (let gifid of gifIds) {
        if (this.gif.id === gifid) {
          this.gif.isFavourite = true;
        }
      }
    })
  }
  openView(id) {
    this.routerService.routeToView(id);
  }

  addToBookmark(idAttr) {
    this.gifService.bookmarkGif(idAttr).subscribe(
      data => {
        this.gif.isBookmarked = true;
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

  removeFromBookmark(idAttr) {
    this.gifService.removeBookmarkGif(idAttr).subscribe(
      data => {
        this.gif.isBookmarked = false;
        if (this.path == 'bookmarks') {
          this.gif = null;
        }

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

  Bookmark(idAttr) {

    this.path = this.route.snapshot.url[0].path;


    let bookmarked = this.gif.isBookmarked;

    if (bookmarked == true) {
      return this.removeFromBookmark(idAttr);
    }
    else {
      // else if (bookmarked == false) {
      return this.addToBookmark(idAttr);
    }
  }

  addToFavourite(idAttr) {
    this.gifService.favouriteGif(idAttr).subscribe(
      data => {
        this.gif.isFavourite = true;
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

  removeFromFavourite(idAttr) {
    this.gifService.removeFavouriteGif(idAttr).subscribe(
      data => {
        this.gif.isFavourite = false;
        if (this.path == 'favourites') {
          // this.isDataLoaded = false;
          this.gif = null;
        }

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

  Favourite(idAttr) {

    this.path = this.route.snapshot.url[0].path;


    let favorited = this.gif.isFavourite;

    if (favorited == true) {
      return this.removeFromFavourite(idAttr);
    }
    else {
      return this.addToFavourite(idAttr);
    }
  }
}
