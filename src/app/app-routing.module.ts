import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// Components
import { HomeComponent } from './pages/home/home.component';

import {Angular2TokenService} from "angular2-token";
import {BookListComponent} from "./pages/books/book-list/book-list.component";
import {LoginComponent} from "./pages/login/login.component";
import {environment} from "../environments/environment";
import {BookNewComponent} from "./pages/books/book-new/book-new.component";
import {BookDetailsComponent} from "./pages/books/book-details/book-details.component";


const routes: Routes = [
  // Root
  {
    component: HomeComponent,
    path: '',
    canActivate: [Angular2TokenService]
  },
  {
    component: BookListComponent,
    path: 'books',
    canActivate: [Angular2TokenService]
  },
  {
    component: BookNewComponent,
    path: 'books/new',
    canActivate: [Angular2TokenService]
  },
  {
    component: BookDetailsComponent,
    path: 'books/:id',
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

    if(!this.authService.userSignedIn()){

      // this.authService.signIn({
      //   email: 'root@example.com',
      //   password: "monkey67"
      // });

    }
  }
}
