import express from "express";
import Varient from "../Model/Varient.model.ts";
const router = express.Router()

router.post("/add", async(req, res) => {
    const {designId, color} = req.body;
    if(!designId || !color){
        return res.status(400).json({message:"All fields are required"})
    }
    const varient = await Varient.create({designId, color})
    return res.status(201).json({success:true, message:"Varient created successfully", varient})
})

router.delete("/:id/delete", async(req, res) => {
    const id = req.params.id;
    if(!id){
        return res.status(400).json({message:"no varient found"})
    }
    const varient = await Varient.findByIdAndDelete(id)
    return res.status(200).json({success:true, message:"Varient deleted successfully", varient})
})

router.get("/all", async(req, res) => {
    const varient = await Varient.find()
    return res.status(200).json({success:true, message:"Varient fetched successfully", varient})
})

export default router