import { TestBed } from '@angular/core/testing';

import { GifService } from './gif.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { Gif } from '../gif';

describe('GifService', () => {
  let service: GifService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
    })
    service = TestBed.get(GifService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: GifService = TestBed.get(GifService);
    expect(service).toBeTruthy();
  });

  it('should get random GIFs', () => {
    let gifs: Gif[];
    service.getGIFs().subscribe(
      data => expect(data).toBe(gifs),
      fail
    );
    const req = httpMock.expectOne('https://api.giphy.com/v1/gifs/trending?api_key=qMK2X8U4sYFfs5Uz9vfNsdu7hWnrpFfI&limit=40&rating=G');
    expect(req.request.method).toEqual('GET');
  });

  it('should get search GIFs According to the Key', () => {
    let key = 'apple';
    let gifs: Gif[];
    service.performSearch(key).subscribe(
      data => expect(data).toBe(gifs),
      fail
    );
    const req = httpMock.expectOne('https://api.giphy.com/v1/gifs/search?api_key=qMK2X8U4sYFfs5Uz9vfNsdu7hWnrpFfI&q=' + key + '&limit=25&offset=0&rating=G&lang=en');
    expect(req.request.method).toEqual('GET');
  });

  it('should record search GIFs According to the Key', () => {
    const mockData: any = { key: 'apple' };
    const mockData2: any = { userId: 1, gifId: 'xyz' };
    let key = 'apple';
    service.recordSearch(key).subscribe(
      data => expect(data).toBe(mockData2),
      fail
    );
    const req = httpMock.expectOne('http://localhost:8095/RecordSearchGif');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(mockData);
  });

  it('should get Id specific GIFs', () => {
    let gifs: Gif;
    let gif_id = 'xyz';
    service.getGIFById(gif_id).subscribe(
      data => expect(data).toBe(gifs),
      fail
    );
    const req = httpMock.expectOne('https://api.giphy.com/v1/gifs/' + gif_id + '?api_key=qMK2X8U4sYFfs5Uz9vfNsdu7hWnrpFfI');
    expect(req.request.method).toEqual('GET');
  });

  it('should get Ids specific GIFs', () => {
    let gifs: Gif[];
    let gifids = ['xyz', 'xyz'];
    service.getGIFsByIds(gifids).subscribe(
      data => expect(data).toBe(gifs),
      fail
    );
    const req = httpMock.expectOne('https://api.giphy.com/v1/gifs?ids=' + gifids + '&api_key=qMK2X8U4sYFfs5Uz9vfNsdu7hWnrpFfI');
    expect(req.request.method).toEqual('GET');
  });

  it('should add GIFs to Bookmarks', () => {
    const mockData: any = { gifId: 'xyz' };
    const mockData2: any = { userId: 1, gifId: 'xyz' };

    let gifId = 'xyz';
    service.bookmarkGif(gifId).subscribe(
      data => expect(data).toBe(mockData2),
      fail
    );
    const req = httpMock.expectOne('http://localhost:8095/bookmarkGif');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(mockData);
  });

  it('should add GIFs to Favourite', () => {
    const mockData: any = { gifId: 'xyz' };
    const mockData2: any = { userId: 1, gifId: 'xyz' };
    let gifId = 'xyz';
    service.favouriteGif(gifId).subscribe(
      data => expect(data).toBe(mockData2),
      fail
    );
    const req = httpMock.expectOne('http://localhost:8095/favouriteGif');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(mockData);
  });

  it('should get Bookmark GIFs', () => {
    let gifs: String[];
    service.getUserBookmarkGIFs().subscribe(
      data => expect(data).toBe(gifs),
      fail
    );
    const req = httpMock.expectOne('http://localhost:8095/getUserBookmarkGIFs');
    expect(req.request.method).toEqual('GET');
  });

  it('should get favourite GIFs', () => {
    let gifs: String[];
    service.getUserFavouriteGIFs().subscribe(
      data => expect(data).toBe(gifs),
      fail
    );
    const req = httpMock.expectOne('http://localhost:8095/getUserFavouriteGIFs');
    expect(req.request.method).toEqual('GET');
  });

  it('should delete favourite GIF By id', () => {
    const gif_id = 'xyz';
    const mockData: any = { gifId: 'xyz' };
    const mockData2: any = { userId: 1, gifId: 'xyz' };
    service.removeFavouriteGif(gif_id).subscribe(
      data => expect(data).toBe(mockData2),
      fail
    );
    const req = httpMock.expectOne('http://localhost:8095/removeFavouriteGif/' + gif_id);
    expect(req.request.method).toEqual('DELETE');
  });

  it('should delete bookmark GIF By id', () => {
    const gif_id =  'xyz';
    const mockData: any = { gifId: 'xyz' };
    const mockData2: any = { userId: 1, gifId: 'xyz' };
    service.removeBookmarkGif(gif_id).subscribe(
      data => expect(data).toBe(mockData2),
      fail
    );
    const req = httpMock.expectOne('http://localhost:8095/removeBookmarkGif/' + gif_id);
    expect(req.request.method).toEqual('DELETE');
  });

});
