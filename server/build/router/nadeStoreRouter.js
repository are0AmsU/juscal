import { Router } from "express";
import NadeStoreController from "../controllers/NadeStoreController.js";
const router = new Router();
router.get('/', NadeStoreController.getNadeStore);
export default router;
//# sourceMappingURL=nadeStoreRouter.js.map