export interface PostType {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

export type User = {
  id: number;
  nickname: string;
  status: string;
};
