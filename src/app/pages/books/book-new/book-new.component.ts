import {Component, OnInit, Input} from '@angular/core';
import {Book} from "../../../models/book";


@Component({
  selector: 'app-book-new',
  templateUrl: './book-new.component.html',
  styleUrls: ['./book-new.component.sass']
})

export class BookNewComponent implements OnInit {

  book = <Book>{
    title: "",
    description: "",
    author: "",
    is_paid: false
  };

  constructor (){}


  ngOnInit() {}

}
