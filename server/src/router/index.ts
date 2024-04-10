import { Router } from "express";
import mapRouter from "./mapRouter.js";
import adminMapRouter from "./adminMapRouter.js";
import nadeRouter from "./nadeRouter.js";
import targetRouter from "./targetRouter.js";

const router = Router();

router.use("/map", mapRouter);
router.use("/admin-map", adminMapRouter);
router.use("/nade", nadeRouter);
router.use("/target", targetRouter);

export default router;
