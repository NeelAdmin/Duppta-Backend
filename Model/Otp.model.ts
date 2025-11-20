import mongoose from "mongoose";

interface IOtp {
    mobile: string;
    otp: string;
}

const otpSchema = new mongoose.Schema({
    mobile: { type: String, required: true },
    otp: { type: String, required: true },
},
    {
        timestamps: true,
        versionKey: false
    });

export default mongoose.model<IOtp>("Otp", otpSchema);
