import express from "express";
import { getStockAnalysis } from "../Controller/Dashboard.controller.ts";
const router = express.Router();
router.get("/dashboard-stock", getStockAnalysis);
export default router;
