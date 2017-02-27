import {Component, OnInit, OnDestroy} from '@angular/core';
import {Book} from "../../../models/book";
import {ActivatedRoute} from "@angular/router";
import {BooksService} from "../../../services/books.service";
import {Subscription, Observable, Subject} from "rxjs";
import {Chapter} from "../../../models/chapter";

@Component({
  selector: 'app-book-details-view',
  templateUrl: './book-details-view.component.html',
  styleUrls: ['./book-details-view.component.sass']
})
export class BookDetailsViewComponent implements OnInit, OnDestroy {


  bookID:number;
  book$:Observable<Book>;
  chapters$ = new Subject<Chapter[]>();
  subs:Subscription[] = [];


  constructor(private activatedRoute:ActivatedRoute, private booksService:BooksService) {


  }

  ngOnInit() {

    let s = this.activatedRoute.params.subscribe( params => {
      this.bookID = params['id'];
      this.book$  = this.booksService.show(this.bookID, "tags=true&chapters=true");
      this.book$.map(b => this.chapters$.next(b.chapters));
    });

    this.subs.push(s);
  }

  ngOnDestroy(){
    for(let s of this.subs) s.unsubscribe();
  }

}
