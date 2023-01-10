import { Router } from "express";
import { create } from "../controllers/cake.controller.js";
import cakeValidation from "../middlewares/cakeValidation.middleware.js";

const router = Router();

router.post("/cakes", cakeValidation, create);

export default router;