import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {Chapter} from "../../../models/chapter";
import {Book} from "../../../models/book";
import {BooksService} from "../../../services/books.service";
import {ChaptersService} from "../../../services/chapters.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-chapter-new-view',
  templateUrl: './chapter-new-view.component.html',
  styleUrls: ['./chapter-new-view.component.sass']
})
export class ChapterNewViewComponent implements OnInit {

  chapter:Chapter = {
    id: null,
    title: "",
    book_id: null,
    is_paid: false,
    contents: "",
    tag_list: []
  };
  book$:Observable<Book>;

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
    this.activatedRoute.params.subscribe(params =>{
      this.book$ = this.booksService.show(params['book_id'], "tags=true&chapters=true");

    })
  }

}
