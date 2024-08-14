import { Schema, model, models } from 'mongoose';

interface IPost {
  title: string;
  content: string;
  author: Schema.Types.ObjectId;
  likes: Schema.Types.ObjectId[];
  comments: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new Schema<IPost>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Post = models.Post || model<IPost>('Post', postSchema);


















// // models/Post.ts
// import mongoose, { Schema, models, model } from 'mongoose';

// const PostSchema = new Schema({
//   title: { type: String, required: true },
//   content: { type: String, required: true },
//   author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//   tags: [String],
//   images: [{ type: String }],
//   videos: [{ type: String }],
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now },
//   likes: { type: Number, default: 0 },
//   comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
// });

// const Post = models.Post || model('Post', PostSchema);

// export default Post;