import { Router } from "express";
import mapRouter from './mapRouter.js'

const router = new Router()

router.use('/map', mapRouter)

export default router