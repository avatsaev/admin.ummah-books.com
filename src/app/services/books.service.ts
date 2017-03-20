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

    return  this.authTokenService.get(
        `/books`,
        {search: params}
    ).map( res => res.json())

  }

  create(book:Book):Observable<Book>{

    return this.authTokenService.post(
        `books`,
        {book}
    ).map(res => res.json())

  }

  update( book:Book ):Observable<Book>{
    const id = book.id;
    return this.authTokenService.put(`/books/${id}`, {book}).map(res => res.json());
  }

  show(id:string, params:string = "tags=true"):Observable<Book>{

    return this.authTokenService.get(
        `/books/${id}`,
        {search: params}
    ).map(res => res.json());

  }


  remove(book:Book):Observable<Response>{

    return this.authTokenService.delete(`/books/${book.id}`)

  }


}
