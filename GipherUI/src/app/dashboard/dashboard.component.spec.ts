import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of as observableOf, Observable } from 'rxjs';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { GifService } from '../services/gif.service';

const testConfig = {
  gifs: []
};

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let gifService: any;
  let spygetGIFsFromServer: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
      declarations: [DashboardComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: Router, useValue: {} },
        { provide: Location, useValue: { back: () => { } } },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    gifService = TestBed.get(GifService);
    spygetGIFsFromServer = spyOn(gifService, 'getGIFs').and.returnValue(observableOf(testConfig.gifs));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getGIFs should be called whenever DashboardComponent is rendered', () => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    expect(gifService.getGIFs).toHaveBeenCalled();
  });
});
