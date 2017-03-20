
import {Chapter} from "./chapter";
// export interface BookCover {
//   original:string;
//   big:string;
//   medium:string;
//   thumb:string;
// }

export interface Book{
  readonly id?:string;
  title:string;
  description:string;
  author: string;
  slug?: string,
  is_paid:boolean;
  book_tag_list?: string[];
  chapters?: Chapter[];

}