import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User';
import { IComment } from './Comment';

export interface IPost extends Document {
  title: string;
  content: string;
  author: {
    _id: string;
    firstName: string;
    lastName: string;
  } | null; 
  createdAt: Date;
  updatedAt: Date;
  likes: IUser['_id'][];
  bookmarks: IUser['_id'][];
  comments: IComment['_id'][];
}

const PostSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  likes: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  bookmarks: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

PostSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Post = mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema);

export default Post;