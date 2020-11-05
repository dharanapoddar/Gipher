import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of as observableOf, Observable } from 'rxjs';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FavouriteComponent } from './favourite.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { GifService } from '../services/gif.service';

const testConfig = {
  gifs: [],
  gifIds: []
};

describe('FavouriteComponent', () => {
  let component: FavouriteComponent;
  let fixture: ComponentFixture<FavouriteComponent>;
  let gifService: GifService;
  let spygetUserFavouriteGIFs: any;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FavouriteComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [
        { provide: Router, useValue: {} }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    gifService = TestBed.get(GifService);
    spygetUserFavouriteGIFs = spyOn(gifService, 'getUserFavouriteGIFs').and.returnValue(observableOf(testConfig.gifs));

    fixture = TestBed.createComponent(FavouriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getUserFavouriteGIFs should be called whenever BookmarksComponent is rendered', () => {
    fixture = TestBed.createComponent(FavouriteComponent);
    component = fixture.componentInstance;
    expect(gifService.getUserFavouriteGIFs).toHaveBeenCalled();
  });

});
