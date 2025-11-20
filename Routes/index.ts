import express from "express"
const router = express.Router()

import User from "../Routes/User.ts"
import Design from "../Routes/Design.ts"
import Varient from "../Routes/Varient.ts"
import Stock from "../Routes/Stock.ts"

router.use("/auth", User)
router.use("/design", Design)
router.use("/varient", Varient)
router.use("/stock", Stock)


export default router;
