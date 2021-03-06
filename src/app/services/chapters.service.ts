import { Injectable } from '@angular/core';
import {Angular2TokenService} from "angular2-token";
import {Book} from "../models/book";
import {Observable} from "rxjs";
import {Response} from "@angular/http";
import {Chapter} from "../models/chapter";


@Injectable()
export class ChaptersService {

  constructor(private authTokenService:Angular2TokenService) {}

  index(book:Book | string):Observable<Chapter[]>{

    let bookID = (typeof book === "string") ?  book : book.id;

    let chapters$ = Observable.create(

        observer => {

          this.authTokenService.get(
              `/books/${bookID}/chapters`
          ).subscribe(
              (res) => {
                const chapters = res.json().map( c => (Object.assign(<Chapter>{}, c)));
                observer.next(chapters)
              }
          );

        }
    );

    return chapters$;

  }

  create(book:Book | string, chapter:Chapter):Observable<Response>{

    let bookID = (typeof book === "string") ?  book : book.id;

    return this.authTokenService.post(
        `/books/${bookID}/chapters`,
        {chapter}
    );

  }

  update(chapter:Chapter ):Observable<Response>{

    const bookID = chapter.book_id;

    delete chapter.book;

    return this.authTokenService.put(`/books/${bookID}/chapters/${chapter.id}`, {chapter});
  }

  show(book_id: string, chapter_id: string, params:string = ""):Observable<Chapter>{

    // let bookID:number = (typeof book === "number")  ?  book : book.id;
    // let chapterID:number = (typeof chapter === "number") ?  chapter : chapter.id;

    // console.log(bookID)
    // console.log(chapterID)


    return this.authTokenService.get(
        `/books/${book_id}/chapters/${chapter_id}`,
        {search: params}
    ).map(res => res.json());

  }


}
