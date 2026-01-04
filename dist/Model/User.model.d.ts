import mongoose, { Document } from "mongoose";
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
declare const UserModel: mongoose.Model<IUserDocument, {}, {}, {}, mongoose.Document<unknown, {}, IUserDocument, {}, {}> & IUserDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default UserModel;
