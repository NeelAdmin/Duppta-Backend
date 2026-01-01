import express from "express"
import { getAllDesign, addDesign, updateDesign, deleteDesign } from "../Controller/Design.controller.ts"
const router = express.Router()

router.post("/add", addDesign)

router.put("/:id/update", updateDesign)

router.delete("/:id/delete", deleteDesign)

router.get("/all", getAllDesign)

export default router
