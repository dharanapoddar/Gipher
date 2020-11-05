import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMasonryModule } from 'ngx-masonry';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthenticationService } from './services/authentication.service';
import { RouterService } from './services/router.service';
import { UserService } from './services/user.service';
import { GifService } from './services/gif.service';
import { AuthHttpInterceptorService } from './services/auth-http-interceptor.service';
import { AuthGuard } from './auth.guard';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { LogoutComponent } from './logout/logout.component';
import { ViewComponent } from './view/view.component';
import { ViewGIFOpenerComponent } from './view-gifopener/view-gifopener.component';
import { GifComponent } from './gif/gif.component';
import { SearchComponent } from './search/search.component';

export function tokenGetter() {
  return localStorage.getItem('bearerToken');
}

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'logout', component: LogoutComponent },
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'bookmarks', component: BookmarksComponent,
      },
      {
        path: 'gif/:gifId/view', component: ViewGIFOpenerComponent, outlet: 'viewGIFOutlet'
      },
      { path: 'favourites', component: FavouriteComponent },
      { path: 'search', component: SearchComponent },
    ]
  },
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomePageComponent,
    HeaderComponent,
    DashboardComponent,
    BookmarksComponent,
    FavouriteComponent,
    LogoutComponent,
    ViewComponent,
    ViewGIFOpenerComponent,
    GifComponent,
    SearchComponent,
  ],
  entryComponents: [ViewComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { enableTracing: true }),
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatGridListModule,
    MatCardModule,
    MatDialogModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    }),
    NgxMasonryModule

  ],
  providers: [AuthenticationService,
    RouterService,
    UserService,
    AuthGuard,
    GifService,
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptorService, multi: true
    }
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
