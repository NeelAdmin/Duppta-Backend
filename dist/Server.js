import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import connectDB from "./Config/dbconnect.js";
import router from "./Routes/index.js";
connectDB();
const app = express();
// change this to your frontend origin (or set CLIENT_URL in .env)
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
// If you need multiple origins, use a whitelist array instead
const whitelist = [CLIENT_URL, "http://localhost:3000"];
app.use(cors({
    origin: ((origin, callback) => {
        // allow requests with no origin (like Postman, curl) — adjust if you want to block them
        if (!origin)
            return callback(null, true);
        if (whitelist.includes(origin))
            return callback(null, true);
        // For debugging you can console.log(origin) here
        return callback(new Error("Not allowed by CORS"));
    }),
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept", "X-Requested-With"],
    // exposeHeaders: ["set-cookie"] // only if you need to read server-set headers in client
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send("Hello World!--->");
});
app.use("/api", router);
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
