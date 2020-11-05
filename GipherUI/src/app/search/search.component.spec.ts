import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of as observableOf, Observable } from 'rxjs';

import { SearchComponent } from './search.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { GifService } from '../services/gif.service';

const testConfig = {
  gifs: []
};

class ActivatedRouteMock {
  queryParams = new Observable(observer => {
    const urlParams = {
      key: 'apple',

    }
    observer.next(urlParams);
    observer.complete();
  });
}

describe('SearchComponent', () => {
  let component: SearchComponent;
  let gifService: any;
  let spyrecordSearch: any;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteMock },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    gifService = TestBed.get(GifService);
    localStorage.setItem('bearerToken', 'x');
    localStorage.setItem('userName', 'x');
    spyOn(gifService, 'performSearch').and.returnValue(observableOf(testConfig.gifs));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('recordSearch should be called whenever SearchComponent is rendered', () => {
    expect(gifService.performSearch).toHaveBeenCalled();
  });

});
