import express from "express";
import {
  addToCart,
  deleteCartItem,
  fetchCartItems,
} from "../controllers/CartController.js";

const router = express.Router();

router.post("/add", addToCart);
router.get("/all/:userId", fetchCartItems);
router.delete("/delete/:userId/:pizzaId", deleteCartItem);

export default router;
