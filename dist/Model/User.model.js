import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import pkg from "jsonwebtoken";
const { sign, verify } = pkg;
const UserSchema = new Schema({
    name: { type: String, required: true },
    mobile: { type: Number, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    role: { type: String, required: true, enum: ["user", "admin"], default: "user" },
    refreshToken: { type: String, required: false },
}, { timestamps: true, versionKey: false });
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return next();
    const saltRounds = 12;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
});
UserSchema.methods.isPasswordCorrect = async function (password) {
    return bcrypt.compare(password, this.password);
};
function getSecretOrThrow(envName) {
    const s = process.env[envName];
    if (!s)
        throw new Error(`${envName} is not set`);
    return s;
}
UserSchema.methods.generateAccessToken = function () {
    const secret = getSecretOrThrow("ACCESS_TOKEN_SECRET");
    const opts = {
        expiresIn: (process.env.ACCESS_TOKEN_EXPIRY || "15m"),
        algorithm: "HS256",
    };
    const payload = {
        _id: this._id.toString(),
        name: this.name,
        mobile: this.mobile,
        role: this.role,
    };
    return sign(payload, secret, opts);
};
UserSchema.methods.generateRefreshToken = function () {
    const secret = getSecretOrThrow("REFRESH_TOKEN_SECRET");
    const opts = {
        expiresIn: (process.env.REFRESH_TOKEN_EXPIRY || "7d"),
        algorithm: "HS256",
    };
    const payload = { _id: this._id.toString() };
    return sign(payload, secret, opts);
};
const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
