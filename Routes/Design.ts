import express from "express"
import Design from "../Model/Design.model.ts"
const router = express.Router()

router.post("/add", async (req, res) => {
    const {name, ratePerMeter, ratePerUnit} = req.body;

    if(!name || !ratePerMeter || !ratePerUnit){
        return res.status(400).json({message:"All fields are required"})
    }

    const design = await Design.create({name, ratePerMeter, ratePerUnit})
    return res.status(201).json({success:true, message:"Design created successfully", design})
})

router.put("/:id/update", async(req, res) => {
    const {name, ratePerMeter, ratePerUnit} = req.body;
    const id = req.params.id;
    if(!id){
        return res.status(400).json({message:"no design found"})
    }
    const design = await Design.findByIdAndUpdate(id, {name, ratePerMeter, ratePerUnit})
    return res.status(200).json({success:true, message:"Design updated successfully", design})
})

router.delete("/:id/delete", async(req, res) => {
    const id = req.params.id;
    if(!id){
        return res.status(400).json({message:"no design found"})
    }
    const design = await Design.findByIdAndDelete(id)
    return res.status(200).json({success:true, message:"Design deleted successfully", design})
})

router.get("/all", async(req, res) => {
    const design = await Design.find()
    return res.status(200).json({success:true, message:"Design fetched successfully", design})
})

export default router
