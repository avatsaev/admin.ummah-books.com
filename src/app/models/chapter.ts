export interface Chapter{
  id:number;
  book_id:number;
  title:string;
  is_paid:boolean;
  contents:string;
  tag_list?:string[];
}