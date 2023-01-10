import { Router } from "express";
import { create, getAll, getOne, getOrdersByClient } from "../controllers/order.controller.js";
import orderValidation from "../middlewares/orderValidation.middleware.js";
import verifyClientExists from "../middlewares/verifyClientExists.middleware.js";


const router = Router();

router.post("/orders", orderValidation, create);
router.get("/orders", getAll);
router.get("/orders/:id", getOne);
router.get("/clients/:id/orders", verifyClientExists, getOrdersByClient);

export default router;