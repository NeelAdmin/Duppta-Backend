import express from "express"
import { getStockAnalysis } from "../Controller/Dashboard.controller.js"

const router = express.Router()

router.get("/dashboard-stock", getStockAnalysis)


export default router