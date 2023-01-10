import { Router } from "express";
import { create } from "../controllers/client.controller.js";
import  clientValidation  from "../middlewares/clientValidation.middleware.js";

const router = Router();

router.post("/clients", clientValidation, create);

export default router;