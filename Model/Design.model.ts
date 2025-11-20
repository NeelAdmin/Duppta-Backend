import mongoose from "mongoose";

const DesignSchema = new mongoose.Schema({
    name:{type:String , required:true , unique:true},
    ratePerMeter:{type:Number , required:true},
    ratePerUnit:{type:Number , required:true},
})

export default mongoose.model("Design", DesignSchema);