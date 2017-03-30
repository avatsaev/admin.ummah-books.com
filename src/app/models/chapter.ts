import {Book} from "./book";
export interface Chapter{
  readonly id:string;
  book_id:string;
  title:string;
  is_paid:boolean;
  contents:string;
  chapter_tag_list?:string[];
  book?:Book;
}