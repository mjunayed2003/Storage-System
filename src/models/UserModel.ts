import mongoose, { Document, Schema, Model } from "mongoose";

interface OPTType {
  value: string;
  createAT: Date;
}
// Define TypeScript interface
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  userName: string;
  OTP: OPTType;
  profilePic: string;
}

const otpSchema = new Schema<OPTType>(
  {
    value: String,
    createAT: Date,
  },
  { _id: false }
);

// Create Schema
const userSchema: Schema<IUser> = new Schema(
  {
    userName: {
      type: String,
      required: [true, "UserName is required"],
    },
    email: {
      type: String,
      default: "",
      required: [true, "Email required"],
      unique: [true, "email already exist"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    profilePic: {
      type: String,
    },
    OTP: otpSchema,
  },
  { versionKey: false }
);

// Create Model
const UserModel: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default UserModel;
