import {Component, OnInit, Input} from '@angular/core';
import {Book} from "../../../models/book";
import {Router} from "@angular/router";


@Component({
  selector: 'app-book-new',
  templateUrl: 'book-new-view.component.html',
  styleUrls: ['book-new-view.component.sass']
})

export class BookNewViewComponent implements OnInit {

  newBook:Book = {
    title: "",
    description: "",
    author: "",
    is_paid: true,
    chapters: [],
    book_tag_list: []
  };

  constructor (private router:Router){
  }


  onBookCreated(book){
    if(book.id) this.router.navigate(['/books', book.id]);
  }


  ngOnInit() {
  }

}
