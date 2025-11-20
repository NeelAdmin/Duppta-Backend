    import jwt from "jsonwebtoken";
    import UserModel from "../Model/User.model.ts";
    import express from "express";
import { AnyARecord } from "node:dns";

    export const verifyJWT = async (req:express.Request, res:express.Response, next:express.NextFunction) => {
        try {
            const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        
            if (!token) {
                throw new Error("Unauthorized");
            }
        
            const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string)
            if(!decodedToken){
                throw new Error("Unauthorized");
            }
            const user = await UserModel.findById((decodedToken as { _id: string })._id ).select("-password -refreshToken");
        
        
            if (!user) {
                throw new Error("Unauthorized");
            }
        
            req.user = user;
            next();
        } catch (error) {
            return res.status(401).json({message:"Unauthorized"})
        }
    }