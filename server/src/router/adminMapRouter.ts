import { Router } from "express";
import AdminMapController from "../controllers/AdminMapController/index.js";
import { upload } from "../middlewares/multer.js";

const router = Router()

router.get('/:mapId', AdminMapController.getMapAndNadeAndTargetsByMapId)
router.post('/target-nade', upload.fields([{ name: 'screenshots', maxCount: 5 }]), AdminMapController.createNadeAndTargets as any)

export default router