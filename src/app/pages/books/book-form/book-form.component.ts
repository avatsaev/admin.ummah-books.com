import {Component, OnInit, Input} from '@angular/core';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {BooksService} from "../../../services/books.service";
import {Book} from "../../../models/book";


@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.sass']
})
export class BookFormComponent implements OnInit {

  form: FormGroup;
  ckeditorContent:string;

  @Input('book') book:Book;

  constructor(fBuild: FormBuilder, private booksService:BooksService) {
    this.form = fBuild.group({
      "title":  ["", Validators.required],
      "description": ["", Validators.required],
      "author": ["", Validators.required],
      "is_paid": [""],
    });
  }

  onFormSubmit(){

    this.ckeditorContent = ``;

    let book:Book = Object.assign(<Book>{}, this.form.value);

    if(this.book.id){



    }else{

      this.booksService.create(book).subscribe(
          res => {
            console.log(res)
          },

          err => {
            console.log(err)
          }
      );

    }


  }

  ngOnInit() {
  }

}
