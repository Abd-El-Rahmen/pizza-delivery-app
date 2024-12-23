import { createOrder, getAllOrders, getAllOrdersByUser, updateOrderStatus } from "../controllers/OrderController.js";
import express from "express";

const router = express.Router();

router.post("/create", createOrder);
router.get("/all", getAllOrders);
router.get("/list/:userId", getAllOrdersByUser);
router.put("/update", updateOrderStatus);


export default router;
