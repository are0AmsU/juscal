import { Router } from "express";
import AdminMapController from "../controllers/AdminMapController.js";
import { upload } from "../middlewares/multer.js";
const router = new Router();
router.get('/:mapId', AdminMapController.getMapAndNadeAndTargetsByMapId);
router.post('/target-nade', upload.fields([{ name: 'screenshots', maxCount: 5 }]), AdminMapController.createNadeAndTargets);
export default router;
//# sourceMappingURL=adminMapRouter.js.map