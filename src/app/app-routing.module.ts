import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// Components
import { HomeComponent } from './pages/home/home.component';

import {Angular2TokenService} from "angular2-token";
import {LoginComponent} from "./pages/login/login.component";
import {environment} from "../environments/environment";
import {
  BookNewViewComponent,
  BookEditViewComponent,
  BookListViewComponent,
  BookDetailsViewComponent
} from "./pages/books";


const routes: Routes = [
  {
    component: HomeComponent,
    path: '',
    canActivate: [Angular2TokenService]
  },
  {
    component: BookListViewComponent,
    path: 'books',
    canActivate: [Angular2TokenService]
  },
  {
    component: BookNewViewComponent,
    path: 'books/new',
    canActivate: [Angular2TokenService]
  },
  {
    component: BookDetailsViewComponent,
    path: 'books/:id',
    canActivate: [Angular2TokenService]
  },
  {
    component: BookEditViewComponent,
    path: 'books/:id/edit',
    canActivate: [Angular2TokenService]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule {

  constructor(private authService:Angular2TokenService){
    this.authService.init(environment.tokenAuthConfig);
  }
}
