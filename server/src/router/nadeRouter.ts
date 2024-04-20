import { Router } from "express";
import NadeController from "../controllers/NadeController/index.js";

const router = Router();

router.post("/:mapId", NadeController.create as any);
router.delete("/:nadeId", NadeController.deleteById);

export default router;
