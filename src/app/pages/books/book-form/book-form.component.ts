import {Component, OnInit, Input, Output, EventEmitter, OnChanges, OnDestroy} from '@angular/core';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {BooksService} from "../../../services/books.service";
import {Book} from "../../../models/book";
import {TagsService} from "../../../services/tags.service";
import {Observable, Subscription} from "rxjs";


@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.sass']
})

export class BookFormComponent implements OnInit, OnChanges, OnDestroy {

  form: FormGroup;
  loading = true;
  autoCompleteTags$: Observable<string[]>;
  subs:Subscription[] = [];

  @Input() book:Book ={
    id: undefined,
    title: "",
    description: "",
    author: "",
    is_paid: false,
    chapters: [],
    tag_list: []
  };

  @Output() onBookCreated = new EventEmitter<Book>();
  @Output() onBookUpdated = new EventEmitter<Book>();
  @Output() onBookError = new EventEmitter<any>();

  constructor(protected fBuild: FormBuilder, private booksService:BooksService, private tagsService:TagsService) {

    this.form = fBuild.group({
      "title":  [this.book.title, Validators.required],
      "description": [this.book.description, Validators.required],
      "author": [this.book.author, Validators.required],
      "is_paid": [this.book.is_paid],
      "tag_list": [this.book.tag_list]
    });

  }

  onFormSubmit(){

    const tags = this.form.controls['tag_list'].value.map( tag => typeof tag == "string" ? tag : tag.value);
    Object.assign(this.book, this.form.value, {tag_list: tags});

    if(this.book.id){
      let s = this.booksService.update(this.book).subscribe(
          res => this.onBookUpdated.emit(<Book>{...res.json()}),
          err => this.onBookError.emit(err.json())
      );

      this.subs.push(s);

    }else{

      let s = this.booksService.create(this.book).subscribe(
          res => this.onBookCreated.emit(<Book>{...res.json()}),
          err => this.onBookError.emit(err)
      );

      this.subs.push(s);

    }

  }

  ngOnChanges(){
    if(this.book) {
      this.loading = false;
      this.form.patchValue(this.book);
    }
  }

  ngOnInit() {
    this.autoCompleteTags$ = this.tagsService.mostUsed().map( res => res.json().map( tag => tag.name));
  }

  ngOnDestroy(){
    for(let s of this.subs) s.unsubscribe();
  }


}
