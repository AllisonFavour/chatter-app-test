import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./User";
import { IPost } from "./Post";

export interface IAuthor {
  _id: string;
  firstName: string;
  lastName: string;
}

export interface IComment extends Document {
  _id: string;
  content: string;
  author: IAuthor;
  post: IPost["_id"];
  createdAt: Date;
}

const CommentSchema: Schema = new Schema({
  content: { type: String, required: true },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    autopopulate: { select: "firstName lastName" },
  },
  post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  createdAt: { type: Date, default: Date.now },
});

// Add this line to enable autopopulate
// CommentSchema.plugin(require("mongoose-autopopulate"));

const Comment =
  mongoose.models.Comment || mongoose.model<IComment>("Comment", CommentSchema);

export default Comment;
