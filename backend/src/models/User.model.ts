import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  name?: string;
  authProvider: "local" | "google" | "facebook";
  googleId?: string;
  facebookId?: string;
  isVerified: boolean;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    name: {
      type: String
    },
    authProvider: {
      type: String,
      enum: ["local", "google", "facebook"],
      required: true
    },
    googleId: {
      type: String
    },
    facebookId: {
      type: String
    },
    isVerified: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
