import { Router } from "express";
import AdminMapController from "../controllers/AdminMapController.js";

const router = new Router()

router.get('/:name', AdminMapController.getMapAndNadeByMapName)

export default router