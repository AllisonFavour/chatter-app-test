import { Schema, model, models } from 'mongoose';

interface IComment {
  postId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  content: string;
  createdAt: Date;
}

const commentSchema = new Schema<IComment>({
  postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Comment = models.Comment || model<IComment>('Comment', commentSchema);











// // models/Comment.ts
// import mongoose, { Schema, models, model } from 'mongoose';

// const CommentSchema = new Schema({
//   content: { type: String, required: true },
//   author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//   postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
//   createdAt: { type: Date, default: Date.now },
// });

// const Comment = models.Comment || model('Comment', CommentSchema);

// export default Comment;