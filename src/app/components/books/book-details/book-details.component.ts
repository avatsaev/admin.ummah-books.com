import {Component, OnInit, Input} from '@angular/core';
import {Book} from "../../../models/book";
import {Router} from "@angular/router";
import {BooksService} from "../../../services/books.service";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.sass']
})
export class BookDetailsComponent implements OnInit {


  @Input() book:Book = {
    title: "",
    description: "",
    tag_list: [],
    chapters: [],
    author: "",
    is_paid: true
  };

  constructor(private router: Router, private booksService:BooksService) { }

  ngOnInit() {

  }

  removeBook(){

    const r = confirm("Are you sure?");
    if (r == true) {
      let s  = this.booksService.remove(this.book).subscribe(() => this.router.navigate(['/books']) );

     // this.subs.push(s);

    }

  }

}
