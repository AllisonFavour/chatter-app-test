// types/index.ts
import { Types } from 'mongoose';

export interface IUser {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  interests: string[];
  bookmarks: Types.ObjectId[];
}

export interface IPost {
  _id: Types.ObjectId;
  title: string;
  content: string;
  author: Types.ObjectId;
  tags: string[];
  images: string[];
  videos: string[];
  createdAt: Date;
  updatedAt: Date;
  likes: number;
  comments: Types.ObjectId[];
}

export interface IComment {
  _id: Types.ObjectId;
  content: string;
  author: Types.ObjectId;
  postId: Types.ObjectId;
  createdAt: Date;
}
