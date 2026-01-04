import express from "express"
import { verifyJWT } from "../Middleware/Auth.middleware.js"
import { getStock , addStock , updateStock , deleteStock , getAssignedStock } from "../Controller/Stock.controller.js"
const router = express.Router()




router.get("/get", verifyJWT, getStock)

router.post("/add", addStock)

router.put("/:id/update", updateStock)

router.delete("/:id/delete", deleteStock)


router.get("/get-assigned-stocks", verifyJWT, getAssignedStock)

export default router
