import { User } from './user.model';

export interface Post {
  _id: string;
  title: string;
  content: string;
  author: User;
  tags: string[];
  isPublished: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostRequest {
  title: string;
  content: string;
  author: string;
  tags?: string[];
  isPublished?: boolean;
}

export interface UpdatePostRequest {
  title?: string;
  content?: string;
  tags?: string[];
  isPublished?: boolean;
}
