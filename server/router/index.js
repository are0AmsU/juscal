import { Router } from "express";
import mapRouter from './mapRouter.js'
import adminMapRouter from './adminMapRouter.js'

const router = new Router()

router.use('/map', mapRouter)
router.use('/admin-map', adminMapRouter)

export default router