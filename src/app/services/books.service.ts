import { Injectable } from '@angular/core';
import {Angular2TokenService} from "angular2-token";
import {Book} from "../models/book";
import {Observable} from "rxjs";
import {Response} from "@angular/http";


@Injectable()
export class BooksService {

  constructor(private authTokenService:Angular2TokenService) {}

  index():Observable<Book[]>{

    let books$ = Observable.create(

        observer => {

          this.authTokenService.get(
              `/books`
          ).subscribe(
              (res) => {
                const books = res.json().map( b => (Object.assign(<Book>{}, b)));
                observer.next(books.reverse())
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

  show(id:number):Observable<Book>{

    const book$:Observable<Book> = Observable.create (
        observer => {

          this.authTokenService.get(
              `/books/${id}`
          ).subscribe(
              res => {
                console.log(res);
                observer.next(Object.assign(<Book>{}, res.json()));
              }
          );
        }
    );

    return book$;

  }


}
