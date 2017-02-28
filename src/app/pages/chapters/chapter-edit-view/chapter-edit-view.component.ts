import { Component, OnInit } from '@angular/core';
import {Book} from "../../../models/book";
import {Observable} from "rxjs";
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

  constructor(
      private router:Router,
      private booksService:BooksService,
      private activeRoute:ActivatedRoute,
      private chaptersService:ChaptersService
  ) {}

  ngOnInit() {
    this.activeRoute.params.subscribe(
        params => {
          console.log(params);
          this.chapter$ = this.chaptersService.show(params['book_id'], params['id'], "tags=true&book=true");
          this.chapter$.subscribe(console.log);
        }
    );
  }

  onBookUpdated(b:Book){
    this.router.navigate(['/books', b.id])
  }

  onBookError(err){
    alert(JSON.stringify(err));
  }

}
