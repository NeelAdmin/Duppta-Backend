import express from "express"
import Stock from "../Model/Stock.model.ts"
const router = express.Router()

router.get("/get", async(req, res) => {
    
    const stock = await Stock.aggregate
    ([
  {
    $lookup: {
      from: "designs",
      let: { did: "$designId" },
      pipeline: [
        { $match: {
            $expr: {
              $eq: ["$_id", { $toObjectId: "$$did" }]
            }
        } },
        { $project: { name: 1, ratePerUnit: 1, ratePerMeter: 1 } }
      ],
      as: "design"
    }
  },
  { $unwind: { path: "$design", preserveNullAndEmptyArrays: true } },

  {
    $lookup: {
      from: "varients",
      let: { vid: "$varientId" },
      pipeline: [
        { $match: { $expr: { $eq: ["$_id", { $toObjectId: "$$vid" }] } } },
        { $project: { color: 1, size: 1 } }
      ],
      as: "varient"
    }
  },
  { $unwind: { path: "$varient", preserveNullAndEmptyArrays: true } },

  { $project: { design: 1, varient: 1, meter: 1, unit: 1 } }
]
)


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
    const {designId, varientId, meter, unit, cutBy, fitBy , id} = req.body;
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
