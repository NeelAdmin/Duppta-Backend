    import jwt from "jsonwebtoken";
    import UserModel from "../Model/User.model.js";
    import express from "express";

    export const verifyJWT = async (req:any, res:express.Response, next:express.NextFunction) => {
        try {
            
            const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
             
            if (!token) {
                throw new Error("Unauthorized token not found");
            }
        
            const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string)
            if(!decodedToken){
                throw new Error("Unauthorized decoded");
            }
            const user = await UserModel.findById((decodedToken as { _id: string })._id ).select("-password -refreshToken");
        
        
            if (!user) {
                throw new Error("Unauthorized , user not found");
            }
        
            req.user = user;
            next();
        } catch (error) {
            return res.status(401).json({message:"Unauthorized"})
        }
    }