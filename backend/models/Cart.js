import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    items: [
      {
        pizzaId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Pizza",
        },
        selectedVariant: {
          type: Map,
          of: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Cart", CartSchema);

export default Cart;
