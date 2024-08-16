import mongoose, { Schema, Document } from 'mongoose';
import { IPost } from './Post'; // Import the IPost interface

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  bookmarks: IPost['_id'][];
}

const UserSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bookmarks: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
});

const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
