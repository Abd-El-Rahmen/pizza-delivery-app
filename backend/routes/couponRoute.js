import express from "express";
import { getCoupon, useCoupon } from "../controllers/CouponController.js";

const router = express.Router();

router.put("/use-coupon", useCoupon);
router.get('/get-coupon',getCoupon)

export default router;
