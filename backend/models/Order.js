import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userId: String,
    cartItems: [
      {
        pizzaId: String,
        name: String,
        selectedVariant: {
          type: Map,
          of: Number,
        },
        quantity: Number,
      },
    ],
    addressInfo: {
      streetAddress: String,
      state: String,
      zipCode: String,
      phone: String,
    },
    coupon: {
      type: String,
      default: "",
    },
    totalAmount: Number,
    orderStatus: String,
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order',OrderSchema);
export default Order;
