import { Router } from "express";
import NadeController from "../controllers/NadeController/index.js";
const router = Router();
router.post("/:mapId", NadeController.create);
export default router;
//# sourceMappingURL=nadeRouter.js.map