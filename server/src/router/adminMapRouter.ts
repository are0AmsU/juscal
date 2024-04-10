import { Router } from "express";
import AdminMapController from "../controllers/AdminMapController/index.js";
import { upload } from "../middlewares/multer.js";

const router = Router();

router.get("/:mapId", AdminMapController.getMapAndNadeAndTargetsByMapId as any);

export default router;
