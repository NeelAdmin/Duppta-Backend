import mongoose from "mongoose"

const connectDB = async () => {
    try {
        const mongoUrl = process.env.MONGO_URL;
        if (!mongoUrl) {
            throw new Error('MONGO_URL environment variable is not defined');
        }
        await mongoose.connect(mongoUrl)
        console.log("MongoDB connected")
    } catch (error) {
        console.log(error)
    }
}
export default connectDB
