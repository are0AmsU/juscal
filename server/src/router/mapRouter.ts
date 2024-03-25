import { Router } from "express";
import MapController from "../controllers/MapController/index.js";
import { upload } from "../middlewares/multer.js";

const router = Router()

router.post('/', upload.fields([{ name: 'img', maxCount: 1 }, { name: 'preview', maxCount: 1 }]), MapController.create as any)
router.get('/', MapController.getAll as any)
router.get('/:id', MapController.getById)
router.put('/:id', upload.fields([{ name: 'img', maxCount: 1 }, { name: 'preview', maxCount: 1 }]), MapController.updateById as any)
router.delete('/:id', MapController.deleteById)

export default router