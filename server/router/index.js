import { Router } from "express";
import mapRouter from './mapRouter.js'
import adminMapRouter from './adminMapRouter.js'
import nadeRouter from './nadeRouter.js'
import nadeTypeRouter from './nadeRouter.js'
import nadeStoreRouter from './nadeStoreRouter.js'

const router = new Router()

router.use('/map', mapRouter)
router.use('/admin-map', adminMapRouter)
router.use('/nade', nadeRouter)
router.use('/nade-type', nadeTypeRouter)
router.use('/nade-store', nadeStoreRouter)

export default router