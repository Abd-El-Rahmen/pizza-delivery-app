import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import { useCoupon } from "./CouponController.js";

const createOrder = async (req, res) => {
  try {
    const { userId, cartItems, addressInfo, totalAmount, coupon } = req.body;
    console.log(coupon);

    if (coupon.length === 10) await useCoupon(coupon, userId);
    const newOrder = new Order({
      userId,
      cartItems,
      addressInfo,
      coupon,
      totalAmount,
      orderStatus: "pending",
    });
    await newOrder.save();
    await Cart.findOneAndDelete({ userId: userId });
    res.status(200).json({
      success: true,
      message: "Order Saved",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error Occured",
    });
  }
};

const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found!",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({});

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found!",
      });
    }
  
   
    
    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    const findOrder = await Order.findById(orderId);

    if (!findOrder) {
      res.status(404).json({
        success: false,
        message: "Order Not Found",
      });
    }

    findOrder.orderStatus = status;
    await findOrder.save();
    res.status(200).json({
      success: true,
      message: "Order Status Updated",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error Occured",
    });
  }
};

export { createOrder, getAllOrdersByUser, updateOrderStatus, getAllOrders };
