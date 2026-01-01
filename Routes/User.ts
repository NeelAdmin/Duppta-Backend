import express from "express"
import { registerUser, loginUser } from "../Controller/User.controller.ts";
import { verifyJWT } from "../Middleware/Auth.middleware.ts";
import UserModel from "../Model/User.model.ts";
const router = express.Router()


router.get("/users", verifyJWT, async(req, res) => {
    const users = await UserModel.find({ role: "user" }).select("-password -refreshToken");
    return res.status(200).json({success:true, message:"User fetched successfully", users})
})


router.post("/register", registerUser)
router.post("/login", loginUser)

export default router
