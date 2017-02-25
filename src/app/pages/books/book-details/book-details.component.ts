import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router'
import {BooksService} from "../../../services/books.service";
import {Book} from "../../../models/book";
import {Observable} from "rxjs";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.sass']
})
export class BookDetailsComponent implements OnInit {


  bookID$:Observable<number>;
  book$:Observable<Book>;

  constructor(private activatedRoute:ActivatedRoute, private booksService:BooksService) { }


  ngOnInit() {

    this.bookID$ = this.activatedRoute.params.map(params => params['id']);

    this.bookID$.subscribe(bookID => {
      this.book$ = this.booksService.show(bookID);
    });

  }

}
