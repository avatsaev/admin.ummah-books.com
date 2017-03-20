import { Component, OnInit } from '@angular/core';
import {Book} from "../../../models/book";
import {Observable, Subscription} from "rxjs";
import {Router, ActivatedRoute} from "@angular/router";
import {BooksService} from "../../../services/books.service";
import {ChaptersService} from "../../../services/chapters.service";
import {Chapter} from "../../../models/chapter";

@Component({
  selector: 'app-chapter-edit-view',
  templateUrl: './chapter-edit-view.component.html',
  styleUrls: ['./chapter-edit-view.component.sass']
})
export class ChapterEditViewComponent implements OnInit {

  chapter$:Observable<Chapter>;

  subs:Subscription[] = []

  constructor(
      private router:Router,
      private booksService:BooksService,
      private activeRoute:ActivatedRoute,
      private chaptersService:ChaptersService
  ) {}

  ngOnInit() {
    let s = this.activeRoute.params.subscribe(
        params => {
          console.log(params);
          this.chapter$ = this.chaptersService.show(params['book_id'], params['id'], "tags=true&book=true");
          this.chapter$.subscribe(console.log);
        }
    );

    this.subs.push(s);
  }

  onChapterUpdated(c:Chapter){
    this.router.navigate(['/books', c.book_id, 'chapters', c.id])
  }

  onBookError(err){
    alert(JSON.stringify(err));
  }

}
