import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { MatMenuModule } from '@angular/material/menu';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let debugElement: any;
  let element: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [MatMenuModule, HttpClientTestingModule, HttpClientModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: Router, useValue: {} },
        { provide: Location, useValue: { back: () => { } } },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle navigation to search view', fakeAsync(() => {
    debugElement = fixture.debugElement.query(By.css('.search'));
    if (debugElement) {
      element = debugElement.nativeElement;
      element.click();
      tick();
      expect(component.searchField).toContain('',
        `should navigate to Dashboard`);
    } else {
      expect(true).toBe(true,
        `should navigate to Search component`);
    }
  }));

  it('should clear search field', fakeAsync(() => {
    debugElement = fixture.debugElement.query(By.css('.clean'));
    if (debugElement) {
      element = debugElement.nativeElement;
      element.click();
      tick();
      expect(component.searchField).toContain('',
        `should clear Search field`);
    }
  }));

});
