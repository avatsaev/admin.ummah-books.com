import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {Book} from "../../../models/book";
import {Router} from "@angular/router";
import {BooksService} from "../../../services/books.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.sass']
})
export class BookDetailsComponent implements OnInit, OnDestroy {

  subs: Subscription[] = [];


  @Input() book:Book = {
    title: "",
    description: "",
    book_tag_list: [],
    chapters: [],
    author: "",
    is_paid: true
  };

  constructor(private router: Router, private booksService:BooksService) { }

  ngOnInit() {

  }

  ngOnDestroy(){
    this.subs.map(s => s.unsubscribe());
  }

  removeBook(){

    const r = confirm("Are you sure?");
    if (r == true) {
      let s  = this.booksService.remove(this.book).subscribe(() => this.router.navigate(['/books']) );

      this.subs.push(s);

    }

  }

}
