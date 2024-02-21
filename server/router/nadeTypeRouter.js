import { Router } from "express";
import NadeTypeController from "../controllers/NadeTypeController";

const router = new Router()

router.get('/', NadeTypeController.getAll) 

export default router