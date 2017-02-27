import {Component, OnInit, Input} from '@angular/core';
import {Book} from "../../../models/book";
import {Router} from "@angular/router";


@Component({
  selector: 'app-book-new',
  templateUrl: './book-new.component.html',
  styleUrls: ['./book-new.component.sass']
})

export class BookNewComponent implements OnInit {

  newBook:Book = {
    title: "",
    description: "",
    author: "",
    is_paid: false,
    chapters: [],
    tag_list: []
  };

  constructor (private router:Router){
  }


  onBookCreated(book){
    if(book.id) this.router.navigate(['books']);

  }


  ngOnInit() {
  }

}
