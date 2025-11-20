import express from "express"
import dotenv from "dotenv"
dotenv.config()
import connectDB from "./Config/dbconnect.ts"
import router from "./Routes/index.ts"
connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.use("/api",router)

