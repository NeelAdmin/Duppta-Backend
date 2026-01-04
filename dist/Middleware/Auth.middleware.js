import jwt from "jsonwebtoken";
import UserModel from "../Model/User.model.js";
export const verifyJWT = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            throw new Error("Unauthorized token not found");
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (!decodedToken) {
            throw new Error("Unauthorized decoded");
        }
        const user = await UserModel.findById(decodedToken._id).select("-password -refreshToken");
        if (!user) {
            throw new Error("Unauthorized , user not found");
        }
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};
