import { Injectable } from '@angular/core';
import {Angular2TokenService} from "angular2-token";
import {Book} from "../models/book";
import {Observable} from "rxjs";
import {Response} from "@angular/http";
import {Chapter} from "../models/chapter";


@Injectable()
export class BooksService {

  constructor(private authTokenService:Angular2TokenService) {}

  index(params:string = ""):Observable<Book[]>{

    let books$ = Observable.create(

        observer => {

          this.authTokenService.get(
              `/books`,
              {search: params}
          ).subscribe(
              (res) => {
                //const books = res.json().map( b => (Object.assign(<Book>{}, b)));
                observer.next(res.json())
              }
          );

        }
    );

    return books$;

  }

  create(book:Book):Observable<Response>{

    return this.authTokenService.post(
        `books`,
        {book}
    )

  }

  update( book:Book ){
    const id = book.id;
    return this.authTokenService.put(`/books/${id}`, {book});
  }

  show(id:number, params:string = "tags=true"):Observable<Book>{

    const book$:Observable<Book> = Observable.create (
        observer => {

          this.authTokenService.get(
              `/books/${id}`,
              {search: params}
          ).subscribe(
              res => {
                let book = res.json();
                observer.next(<Book>{
                  ...book,
                  tag_list: book.tag_list.map(t => t.name)
                });
              }

          );
        }
    );

    return book$;

  }


  remove(book:Book):Observable<Response>{

    return this.authTokenService.delete(`/books/${book.id}`)

  }


}
