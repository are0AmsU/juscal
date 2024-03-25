import { Router } from "express";
import NadeController from "../controllers/NadeController/index.js";
import { upload } from "../middlewares/multer.js";

const router = Router()

router.post('/:mapId', upload.fields([{ name: 'screenshots', maxCount: 5 }]), NadeController.create)

export default router