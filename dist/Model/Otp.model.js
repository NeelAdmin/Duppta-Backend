import mongoose from "mongoose";
const otpSchema = new mongoose.Schema({
    mobile: { type: String, required: true },
    otp: { type: String, required: true },
}, {
    timestamps: true,
    versionKey: false
});
export default mongoose.model("Otp", otpSchema);
