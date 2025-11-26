import mongoose from "mongoose";

const VarientSchema = new mongoose.Schema({
    designId:{type:mongoose.Schema.Types.ObjectId , ref:"Design" , required:true},
    color:{type:String , required:true , enum : ["red", "black", "green", "blue", "pink", "maroon", "wine"]},    
})

export default mongoose.model("Varient", VarientSchema);
    