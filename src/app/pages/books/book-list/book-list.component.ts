import { Component, OnInit } from '@angular/core';
import {Angular2TokenService} from "angular2-token";
import {Observable} from "rxjs";
import {Book} from "../../../models/book";
import {BooksService} from "../../../services/books.service";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.sass']
})
export class BookListComponent implements OnInit {


  bookList$:Observable<Book[]>;

  constructor(protected authTokenService:Angular2TokenService,
              private booksService:BooksService) {

    this.bookList$ = this.booksService.index();


  }

  ngOnInit() {
  }

}
