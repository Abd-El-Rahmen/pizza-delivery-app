import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  discountValue: {
    type: Number,
    required: true,
    min: 0,
  },
  maxUses: {
    type: Number,
    default: 1,
    min: 1,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  usedByUsers: {
    users: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        usedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    default: [],
  },
});

const Coupon = mongoose.model("Coupon", couponSchema);

export default Coupon;
