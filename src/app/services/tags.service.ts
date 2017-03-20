import { Injectable } from '@angular/core';
import {Angular2TokenService} from "angular2-token";
import {Observable} from "rxjs";

@Injectable()
export class TagsService {

  constructor(private authTokenService:Angular2TokenService) {}

  mostUsedForBooks(limit:number = 10){
    return this.authTokenService.get(`/tags/most_used_for_books?limit=${limit}`).map(res => res.json());
  }

  mostUsedForChapters(limit:number = 10){
    return this.authTokenService.get(`/tags/most_used_for_chapters?limit=${limit}`).map(res => res.json());
  }

}
