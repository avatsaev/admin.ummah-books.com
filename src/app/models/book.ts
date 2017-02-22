
export interface BookCover {
  original:string;
  big:string;
  medium:string;
  thumb:string;
}

export interface Book{
  id:number;
  title:string;
  description:string;
  author: string;
  is_paid:boolean;
}