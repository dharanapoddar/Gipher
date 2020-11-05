import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gif } from '../gif';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, from } from 'rxjs';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'text/html', 'Access-Control-Allow-Origin': 'https://api.giphy.com/*' })
};

@Injectable({
  providedIn: 'root'
})
export class GifService {
  gifs: Gif[];
  gifsSubject: BehaviorSubject<Gif[]>;

  constructor(private httpClient: HttpClient) { }

  getGIFs(): Observable<Gif[]> {
    return this.httpClient.get<Gif[]>('https://api.giphy.com/v1/gifs/trending?api_key=qMK2X8U4sYFfs5Uz9vfNsdu7hWnrpFfI&limit=40&rating=G');
  }

  performSearch(searchTerm: String): Observable<Gif[]> {
    return this.httpClient.get<Gif[]>('https://api.giphy.com/v1/gifs/search?api_key=qMK2X8U4sYFfs5Uz9vfNsdu7hWnrpFfI&q=' + searchTerm +
      '&limit=25&offset=0&rating=G&lang=en');
  }

  recordSearch(searchTerm: String) {
    return this.httpClient.post<Gif>('http://localhost:8095/RecordSearchGif', {
      key: searchTerm
    });
  }

  getGIFById(gifid: any): Observable<Gif> {
    return this.httpClient.get<Gif>('https://api.giphy.com/v1/gifs/' + gifid + '?api_key=qMK2X8U4sYFfs5Uz9vfNsdu7hWnrpFfI');
  }

  getGIFsByIds(gifids): Observable<Gif[]> {
    return this.httpClient.get<Gif[]>('https://api.giphy.com/v1/gifs?ids=' + gifids + '&api_key=qMK2X8U4sYFfs5Uz9vfNsdu7hWnrpFfI');
  }

  removeBookmarkGif(gif_id: any) {
    return this.httpClient.delete<Gif>('http://localhost:8095/removeBookmarkGif/' + gif_id);
  }

  bookmarkGif(gif_id: any) {
    return this.httpClient.post<Gif>('http://localhost:8095/bookmarkGif', {
      gifId: gif_id
    });
  }

  getUserBookmarkGIFs(): Observable<String[]> {
    return this.httpClient.get<String[]>('http://localhost:8095/getUserBookmarkGIFs');
  }

  removeFavouriteGif(gif_id: any) {
    return this.httpClient.delete<Gif>('http://localhost:8095/removeFavouriteGif/' + gif_id);
  }

  favouriteGif(gif_id: any) {
    return this.httpClient.post<Gif>('http://localhost:8095/favouriteGif', {
      gifId: gif_id
    });
  }

  getUserFavouriteGIFs(): Observable<String[]> {
    return this.httpClient.get<String[]>('http://localhost:8095/getUserFavouriteGIFs');
  }
}
