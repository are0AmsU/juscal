import { Router } from "express";
import mapRouter from './mapRouter.js'
import adminMapRouter from './adminMapRouter.js'
import nadeRouter from './nadeRouter.js'

const router = Router()

router.use('/map', mapRouter)
router.use('/admin-map', adminMapRouter)
router.use('/nade', nadeRouter)

export default router