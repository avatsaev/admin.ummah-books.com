import {Component, OnInit, Input, Output, EventEmitter, OnDestroy, OnChanges} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {Chapter} from "../../../models/chapter";
import {BooksService} from "../../../services/books.service";
import {TagsService} from "../../../services/tags.service";
import {ChaptersService} from "../../../services/chapters.service";
import {Book} from "../../../models/book";

@Component({
  selector: 'app-chapter-form',
  templateUrl: './chapter-form.component.html',
  styleUrls: ['./chapter-form.component.sass']
})
export class ChapterFormComponent implements OnInit, OnDestroy, OnChanges {


  form: FormGroup;
  loading = true;
  autoCompleteTags$: Observable<string[]>;
  subs:Subscription[] = [];

  @Input() chapter:Chapter = {title: "", contents: "", is_paid: true, book_id: null, id: null, tag_list: []};
  @Input() book:Book = {
    id: null,
    title: "",
    description: "",
    author: "",
    tag_list: [],
    is_paid: true
  };

  @Output() onChapterCreated = new EventEmitter<Chapter>();
  @Output() onChapterUpdated = new EventEmitter<Chapter>();
  @Output() onChapterError = new EventEmitter<any>();

  constructor(protected fBuild: FormBuilder,
              private booksService:BooksService,
              private tagsService:TagsService,
              private chaptersService: ChaptersService) {

    this.form = fBuild.group({
      "title":  [this.chapter.title, Validators.required],
      "contents":  [this.chapter.contents, Validators.required],
      //"is_paid": [this.chapter.is_paid],
      "tag_list": [this.chapter.tag_list]
    });

  }

  onFormSubmit(){

    const tags = this.form.controls['tag_list'].value.map( tag => typeof tag == "string" ? tag : tag.value);
    Object.assign(this.chapter, this.form.value, {tag_list: tags});

    if(this.chapter.id){// if book has an id call update
      let s = this.chaptersService.update(this.chapter).subscribe(
          res => this.onChapterUpdated.emit(<Chapter>{...res.json()}),
          err => this.onChapterError.emit(err.json())
      );

      this.subs.push(s);

    }else{ ///create a new book otherwise

      let s = this.chaptersService.create(this.book, this.chapter).subscribe(
          res => this.onChapterCreated.emit(<Chapter>{...res.json()}),
          err => this.onChapterError.emit(err)
      );

      this.subs.push(s);

    }

  }

  ngOnChanges(){
    if(this.chapter) {
      this.loading = false;
      this.form.patchValue(this.chapter);
    }
  }

  ngOnInit() {
    this.autoCompleteTags$ = this.tagsService.mostUsed().map( res => res.json().map( tag => tag.name));
  }

  ngOnDestroy(){
    for(let s of this.subs) s.unsubscribe();
  }

}
