// types/types.ts
export interface Resource {
    _id: string;
    name: string;
    description: string;
    type: 'documentary' | 'movie' | 'quote';
    content: string;
    file?: File | null;
    likedByUser?: boolean;
  }
  
  // export interface Hero {
  //   _id?: string;
  //   name: string;
  //   image?: File | string;
  //   description: string;
  //   accomplishments: string[];
  //   medals: string[];
  //   movies: string[];
  //   documentaries: string[];
  //   quotes: string[];
  // }
  export interface Hero {
    _id?: string;
    name: string;
    image?: File | string;
    description: string;
    accomplishments: string | string[]; 
    medals: string | string[];
    movies: Resource[]; 
    documentaries: Resource[]; 
    quotes: Resource[];
  }
  export interface Option {
    label: string;
    image: string;
    _id?: string;
  }
  export interface Question {
    _id?: string;
    text: string;
    
     image?: string;
    options: Option[];
    answer: string;
    quizId?: string;
  }
  
  
  export interface QuizDetail {
    _id: string;
    title: string;
    description: string;
    questions: Question[];
  }