import express from "express";
import { addVarient, deleteVarient, getAllVarient } from "../Controller/Varient.controller.ts";
const router = express.Router();
router.get("/all", getAllVarient);
router.post("/add", addVarient);
router.delete("/:id/delete", deleteVarient);
export default router;
