import {Component, OnInit, OnDestroy} from '@angular/core';
import {BooksService} from "../../../services/books.service";
import {Subscription, Subject, Observable} from "rxjs";
import {Book} from "../../../models/book";

@Component({
  selector: 'app-book-list-view',
  templateUrl: './book-list-view.component.html',
  styleUrls: ['./book-list-view.component.sass']
})
export class BookListViewComponent implements OnInit, OnDestroy {


  books$:Observable<Book[]>;

  subs:Subscription[] = [];

  constructor(private booksService:BooksService) {

    this.books$ = this.booksService.index("tags=true");

  }

  ngOnInit() {}

  ngOnDestroy(){
    for(let s of this.subs) s.unsubscribe();
  }


}
