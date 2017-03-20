import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {BooksService} from "../../../services/books.service";
import {Observable, Subscription} from "rxjs";
import {Book} from "../../../models/book";


@Component({
  selector: 'app-book-edit',
  templateUrl: 'book-edit-view.component.html',
  styleUrls: ['book-edit-view.component.sass']
})
export class BookEditViewComponent implements OnInit, OnDestroy {

  book$:Observable<Book>;
  subs:Subscription[] = [];

  constructor(
      private router:Router,
      private booksService:BooksService,
      private activeRoute:ActivatedRoute) { }

  ngOnInit() {
    let s = this.activeRoute.params.subscribe(
        params => this.book$ = this.booksService.show(params['id'], "tags=true")
    );
    this.subs.push(s);
  }

  ngOnDestroy(){
    this.subs.map(s => s.unsubscribe());
  }

  onBookUpdated(b:Book){
    this.router.navigate(['/books', b.id])
  }

  onBookError(err){
    alert(JSON.stringify(err));
  }

}
