import { Component, OnInit } from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Chapter} from "../../../models/chapter";
import {ChaptersService} from "../../../services/chapters.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-chapter-details-view',
  templateUrl: './chapter-details-view.component.html',
  styleUrls: ['./chapter-details-view.component.sass']
})
export class ChapterDetailsViewComponent implements OnInit {


  chapterID:string;
  bookID:string;
  chapter$:Observable<Chapter>;
  subs:Subscription[] = [];


  constructor(private activatedRoute:ActivatedRoute, private chaptersService:ChaptersService) {
  }

  ngOnInit() {

    let s = this.activatedRoute.params.subscribe( params => {
      this.bookID = params['book_id'];
      this.chapterID = params['id'];
      this.chapter$  = this.chaptersService.show(this.bookID, this.chapterID, "tags=true");
    });

    this.subs.push(s);
  }

  ngOnDestroy(){
    this.subs.map(s => s.unsubscribe());
  }

}
