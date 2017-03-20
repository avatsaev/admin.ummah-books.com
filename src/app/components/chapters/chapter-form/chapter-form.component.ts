import {Component, OnInit, Input, Output, EventEmitter, OnDestroy, OnChanges} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {Chapter} from "../../../models/chapter";
import {BooksService} from "../../../services/books.service";
import {TagsService} from "../../../services/tags.service";
import {ChaptersService} from "../../../services/chapters.service";
import {Book} from "../../../models/book";


declare var CKEDITOR;

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

  @Input() book:Book = {
    id: null,
    title: "",
    description: "",
    author: "",
    book_tag_list: [],
    is_paid: true
  };

  @Input() chapter:Chapter = {
    title: "",
    contents: "",
    is_paid: true,
    book_id: null,
    id: null,
    chapter_tag_list: []
  };



  @Output() onChapterCreated = new EventEmitter<Chapter>();
  @Output() onChapterUpdated = new EventEmitter<Chapter>();
  @Output() onChapterError = new EventEmitter<any>();

  constructor(protected fBuild: FormBuilder,
              private tagsService:TagsService,
              private chaptersService: ChaptersService) {

    this.form = fBuild.group({
      "title":  [this.chapter.title, Validators.required],
      "contents":  [this.chapter.contents, Validators.required],
      "is_paid": [this.chapter.is_paid, Validators.required],
      "chapter_tag_list": [this.chapter.chapter_tag_list]
    });


  }

  onFormSubmit(){

    const tags = this.form.controls['chapter_tag_list'].value.map( tag => typeof tag == "string" ? tag : tag.value);
    Object.assign(this.chapter, this.form.value, {chapter_tag_list: tags});

    if(this.chapter.id){// if book has an id call update
      let s = this.chaptersService.update(this.chapter).subscribe(
          res => this.onChapterUpdated.emit(<Chapter>{...res.json()}),
          err => this.onChapterError.emit(err.json())
      );

      this.subs.push(s);

    }else{ ///create a new chapter otherwise

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
    this.autoCompleteTags$ = this.tagsService.mostUsedForChapters().map(tag => tag.name);

    //
    // CKEDITOR.stylesSet.add('lel', [
    //   // Block-level styles.
    //   {name: 'Blue Title', element: 'h2', styles: {color: 'Blue'}},
    //   {name: 'Red Title', element: 'h3', styles: {color: 'Red'}},
    //   {name: 'CSS Style', element: 'span', attributes: {'class': 'my_style'}},
    //   {name: 'Headline', element: 'span', styles: { "max-width":"50%", "margin-left": "50%", "display": "block"}}
    // ]);
    //
    // CKEDITOR.config.stylesSet = 'lel';
  }

  ngOnDestroy(){
    for(let s of this.subs) s.unsubscribe();
  }

}
