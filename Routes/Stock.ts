import express from "express"
import Stock from "../Model/Stock.model.ts"
const router = express.Router()

router.post("/get", async(req, res) => {
    
    const stock = await Stock.find({})


    return res.status(200).json({success:true, message:"Stock fetched successfully", stock})
})

router.post("/add", async(req, res) => {
    
    const {designId, varientId, meter, unit} = req.body;
    if(!designId || !varientId || !meter || !unit){
        return res.status(400).json({message:"All fields are required"})
    }

    
    
    const stock = await Stock.create({designId, varientId, meter, unit})
 
    return res.status(201).json({success:true, message:"Stock added successfully", stock})
})

router.put("/:id/update", async(req, res) => {
    const {designId, varientId, meter, unit, cutBy, fitBy} = req.body;
    const id = req.params.id;
    if(!id){
        return res.status(400).json({message:"no stock found"})
    }
    if(!designId || !varientId || !meter || !unit || !cutBy || !fitBy){
        return res.status(400).json({message:"All fields are required"})
    }
    const stock = await Stock.findOneAndUpdate({_id:id}, {designId, varientId, meter, unit, cutBy, fitBy})
    return res.status(200).json({success:true, message:"Stock updated successfully", stock})
})

router.delete("/:id/delete", async(req, res) => {
    const id = req.params.id;
    if(!id){
        return res.status(400).json({message:"no stock found"})
    }
    const stock = await Stock.findOneAndDelete({_id:id})
    return res.status(200).json({success:true, message:"Stock deleted successfully", stock})
})

export default router
