import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import pkg from "jsonwebtoken";

const { sign, verify } = pkg;

import type { StringValue } from "ms";
import type { JwtPayload, SignOptions, Secret } from "jsonwebtoken";


interface IUser {
  name: string;
  mobile: number;
  password: string;
  address: string;
  role: string;
  refreshToken?: string; 
}

export interface IUserDocument extends IUser, Document {
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}

interface MyJwtPayload extends JwtPayload {
  _id: string;
  name: string;
  mobile: number;
  role: string;
}

const UserSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true },
    mobile: { type: Number, required: true  , unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    role: { type: String, required: true , enum: ["user", "admin"] , default: "user" },
    refreshToken: { type: String, required: false },
  },
  { timestamps: true, versionKey: false }
);  
 
UserSchema.pre<IUserDocument>("save", async function (next) {
  if (!this.isModified("password")) return next();
  const saltRounds = 12;
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});

UserSchema.methods.isPasswordCorrect = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

function getSecretOrThrow(envName: string): Secret {
  const s = process.env[envName];
  if (!s) throw new Error(`${envName} is not set`);
  return s as Secret;
}

UserSchema.methods.generateAccessToken = function (): string {
  const secret = getSecretOrThrow("ACCESS_TOKEN_SECRET");
  const opts: SignOptions = {
    expiresIn: (process.env.ACCESS_TOKEN_EXPIRY || "15m") as StringValue,
    algorithm: "HS256",
  };

  const payload: MyJwtPayload = {
    _id: this._id.toString(),
    name: this.name,
    mobile: this.mobile,
    role: this.role,
  };

  return sign(payload, secret, opts);
};

UserSchema.methods.generateRefreshToken = function (): string {
  const secret = getSecretOrThrow("REFRESH_TOKEN_SECRET");
  const opts: SignOptions = {
    expiresIn: (process.env.REFRESH_TOKEN_EXPIRY || "7d") as StringValue,
    algorithm: "HS256",
  };

  const payload = { _id: this._id.toString() };

  return sign(payload, secret, opts);
};

const UserModel = mongoose.model<IUserDocument>("User", UserSchema);
export default UserModel;
