import {Component, OnInit, OnDestroy} from '@angular/core';
import {Angular2TokenService} from "angular2-token";
import {Observable, Subject, Subscription} from "rxjs";
import {Book} from "../../../models/book";
import {BooksService} from "../../../services/books.service";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.sass']
})
export class BookListComponent implements OnInit, OnDestroy{


  bookList$ = new Subject<Book[]>();
  bookList:Book[];
  subs:Subscription[] = [];

  constructor(protected authTokenService:Angular2TokenService,
              private booksService:BooksService) {


    let s = this.booksService.index("tags=true").subscribe(res => {
      this.bookList = res;
      this.bookList$.next(this.bookList);
    });

    this.subs.push(s);


  }


  removeBook(book){

    const r = confirm("Are you sure?");
    if (r == true) {
      let s  = this.booksService.remove(book).subscribe(res => {
        if(res.status == 204) this.bookList.splice(this.bookList.indexOf(book),1);
      });

      this.subs.push(s);

    }

  }

  ngOnInit() {
  }

  ngOnDestroy(){
    for(let s of this.subs) s.unsubscribe();
  }

}
