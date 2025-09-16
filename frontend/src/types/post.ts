export interface Reactions {
  likes: number;
  dislikes: number;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  user_id: number;
  tags: string[];
  views: number;
  reactions: Reactions;
  created_at: string;
  updated_at: string;
  author_name?: string;
}

export interface PostForm {
  title: string;
  body: string;
  tags: Tags[];
}

export enum Tags {
  HISTORY = 'history',
  AMERICAN = 'american',
  CRIME = 'crime',
  FRENCH = 'french',
  ENGLISH = 'english',
  MAGICAL = 'magical',
  MEMORY = 'memory',
  CLASSIC = 'classic',
  BOOKS = 'books',
  LIFE = 'life',
  CITY = 'city',
  MUSIC = 'music',
  GAMES = 'games',
}
