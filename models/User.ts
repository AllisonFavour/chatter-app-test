import { Schema, model, models } from 'mongoose';

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  bookmarks: Schema.Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bookmarks: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
});

const User = models.User || model<IUser>('User', userSchema);

export default User;
