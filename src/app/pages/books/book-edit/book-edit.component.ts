import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {BooksService} from "../../../services/books.service";
import {Observable} from "rxjs";
import {Book} from "../../../models/book";


@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.sass']
})
export class BookEditComponent implements OnInit {

  book$:Observable<Book>;

  constructor(private router:Router, private booksService:BooksService, private activeRoute:ActivatedRoute) { }

  ngOnInit() {
    this.activeRoute.params.subscribe( params => this.book$ = this.booksService.show(params['id'], "tags=true"));
  }

  onBookUpdated(b){
    this.router.navigate(['/books'])
  }

  onBookError(err){
    alert(JSON.stringify(err));
  }

}
