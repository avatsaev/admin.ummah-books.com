import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {Chapter} from "../../../models/chapter";
import {Book} from "../../../models/book";
import {BooksService} from "../../../services/books.service";
import {ChaptersService} from "../../../services/chapters.service";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-chapter-new-view',
  templateUrl: './chapter-new-view.component.html',
  styleUrls: ['./chapter-new-view.component.sass']
})

export class ChapterNewViewComponent implements OnInit, OnDestroy {

  chapter:Chapter = {
    id: null,
    title: "",
    book_id: null,
    is_paid: false,
    contents: "",
    chapter_tag_list: []
  };

  book$:Observable<Book>;

  subs:Subscription[] = [];

  constructor (
      private booksService:BooksService,
      private chaptersService:ChaptersService,
      private router:Router,
      private activatedRoute:ActivatedRoute){
  }


  onChapterCreated(chapter){
    if(chapter.id) this.router.navigate(['/books', this.book$.map(b => b.id)]);
  }


  ngOnInit() {
    let s = this.activatedRoute.params.subscribe(params =>{
      this.book$ = this.booksService.show(params['book_id'], "tags=true&chapters=true");

    });
    this.subs.push(s);
  }

  ngOnDestroy(){
    this.subs.map(s => s.unsubscribe());
  }

}
