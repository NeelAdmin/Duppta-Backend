import mongoose from "mongoose";
interface IOtp {
    mobile: string;
    otp: string;
}
declare const _default: mongoose.Model<IOtp, {}, {}, {}, mongoose.Document<unknown, {}, IOtp, {}, {}> & IOtp & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>;
export default _default;
