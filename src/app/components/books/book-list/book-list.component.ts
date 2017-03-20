import {Component, OnInit, Input, ChangeDetectionStrategy, OnDestroy} from '@angular/core';
import {BooksService} from "../../../services/books.service";
import {Subscription} from "rxjs";
import {Book} from "../../../models/book";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookListComponent implements OnInit, OnDestroy {

  @Input() books = new Array<Book>();

  constructor(private booksService:BooksService) { }
  subs:Subscription[] = [];

  ngOnInit() {}

  removeBook(book){

    const r = confirm("Are you sure?");

    if (r == true){

      let s  = this.booksService.remove(book).subscribe(res => {
        if(res.status == 204) this.books.splice(this.books.indexOf(book), 1);
      });

      this.subs.push(s);

    }

  }

  ngOnDestroy(){
    this.subs.map(s => s.unsubscribe());
  }

}
