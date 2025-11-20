import mongoose from "mongoose";

const StockSchema = new mongoose.Schema({
    designId:{type:mongoose.Schema.Types.ObjectId , ref:"Design" , required:true},
    varientId:{type:mongoose.Schema.Types.ObjectId , ref:"Varient" , required:true},
    meter:{type:Number , required:true},
    unit:{type:Number , required:true},
    cutBy:{type:mongoose.Schema.Types.ObjectId , ref:"User" , default:null},
    fitBy:{type:mongoose.Schema.Types.ObjectId , ref:"User" , default:null},
})

export default mongoose.model("Stock", StockSchema);