
import {Chapter} from "./chapter";
// export interface BookCover {
//   original:string;
//   big:string;
//   medium:string;
//   thumb:string;
// }

export interface Book{
  readonly id?:number;
  title:string;
  description:string;
  author: string;
  is_paid:boolean;
  tag_list?: string[];
  chapters?: Chapter[] | number[];
}