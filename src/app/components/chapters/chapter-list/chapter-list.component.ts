import {Component, OnInit, Input, ChangeDetectionStrategy, OnDestroy} from '@angular/core';
import {BooksService} from "../../../services/books.service";
import {Chapter} from "../../../models/chapter";
import {Subject, Subscription} from "rxjs";

@Component({
  selector: 'app-chapter-list',
  templateUrl: './chapter-list.component.html',
  styleUrls: ['./chapter-list.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChapterListComponent implements OnInit, OnDestroy {

  @Input() chapters = new Array<Chapter>();

  //subs:Subscription[] = [];

  constructor() {}

  ngOnInit() {}


  ngOnDestroy(){

  }

}
