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
}
