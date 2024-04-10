import { Router } from "express";
import TargetController from "../controllers/TargetController/index.js";

const router = Router();

router.post("/:mapId", TargetController.create);
router.delete("/:targetId", TargetController.deleteById);

export default router;
