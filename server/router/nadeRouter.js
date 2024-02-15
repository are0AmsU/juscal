import { Router } from "express";
import NadeController from "../controllers/NadeController.js";
import { upload } from "../middlewares/multer.js";

const router = new Router()

router.post('/', upload.fields([{ name: 'screenshots', maxCount: 5 }]), NadeController.create)

export default router