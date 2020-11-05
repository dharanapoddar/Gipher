import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {of as observableOf,  Observable } from 'rxjs';

import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BookmarksComponent } from './bookmarks.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { Router} from '@angular/router';
import { GifService } from '../services/gif.service';

const testConfig = {
  gifs: [],
  gifIds: []
};

describe('BookmarksComponent', () => {
  let component: BookmarksComponent;
  let fixture: ComponentFixture<BookmarksComponent>;
  let gifService: any;
  let spygetUserBookmarkGIFs: any;
  let spygetGIFsByIds: any;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
      declarations: [BookmarksComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: Router, useValue: {} }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    gifService = TestBed.get(GifService);
    spygetUserBookmarkGIFs = spyOn(gifService, 'getUserBookmarkGIFs').and.returnValue(observableOf(testConfig.gifs));
    spygetGIFsByIds = spyOn(gifService, 'getGIFsByIds').and.returnValue(observableOf(testConfig.gifs));

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getUserBookmarkGIFs should be called whenever BookmarksComponent is rendered', () => {
    fixture = TestBed.createComponent(BookmarksComponent);
    component = fixture.componentInstance;
    expect(gifService.getUserBookmarkGIFs).toHaveBeenCalled();
    // expect(gifService.getGIFsByIds).toHaveBeenCalled();
  });
});
