import {Component, OnInit, Input} from '@angular/core';
import {Chapter} from "../../../models/chapter";

@Component({
  selector: 'app-chapter-details',
  templateUrl: './chapter-details.component.html',
  styleUrls: ['./chapter-details.component.sass']
})
export class ChapterDetailsComponent implements OnInit {


  @Input() chapter:Chapter;

  constructor() { }

  ngOnInit() {
  }

}
