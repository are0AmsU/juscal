import { Router } from "express";
import MapController from "../controllers/MapController.js";
import { upload } from "../middlewares/multer.js";
const router = new Router();
router.post('/', upload.fields([{ name: 'img', maxCount: 1 }, { name: 'preview', maxCount: 1 }]), MapController.create);
router.get('/', MapController.getAll);
router.get('/:id', MapController.getById);
router.put('/:id', upload.fields([{ name: 'img', maxCount: 1 }, { name: 'preview', maxCount: 1 }]), MapController.updateById);
router.delete('/:id', MapController.deleteById);
export default router;
//# sourceMappingURL=mapRouter.js.map