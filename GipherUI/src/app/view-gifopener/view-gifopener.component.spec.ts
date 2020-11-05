import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGIFOpenerComponent } from './view-gifopener.component';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA, ComponentFactoryResolver } from '@angular/core';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ViewComponent } from '../view/view.component';


import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

const dialogMock = {
  open: () => { }
};


describe('ViewGIFOpenerComponent', () => {
  let component: ViewGIFOpenerComponent;
  let fixture: ComponentFixture<ViewGIFOpenerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewComponent, ViewGIFOpenerComponent],
      imports: [NoopAnimationsModule, MatDialogModule, MatIconModule, MatCardModule],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],

      providers: [
        {
          provide: MatDialog, useValue: dialogMock
        },
        {
          provide: ActivatedRoute, useValue: {
            snapshot: { params: { gifId: 1 } }
          }
        },
        { provide: Router, useValue: {} },
        { provide: Location, useValue: {} },
      ]

    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [ViewComponent]
      }
    });
    // .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGIFOpenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
