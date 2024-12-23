import Coupon from "../models/Coupon.js";

const useCoupon = async (code, userId) => {
  try {
    const coupon = await Coupon.findOne({ code: code });
    const today = new Date();

    const userAlreadyUsedIt = coupon.usedByUsers.users.findIndex(
      (item) => item.userId.toString() === userId
    );

    const newUser = {
      userId: userId,
      usedAt: today,
    };
    coupon.usedByUsers.users.push(newUser);
    if (coupon.usedByUsers.users.length === coupon.maxUses) {
      coupon.isActive = false;
    }
    coupon.save();
  } catch (error) {
    console.log(error);
  }
};

const getCoupon = async (req, res) => {
  try {
    const { code, userId } = req.query;

    const coupon = await Coupon.findOne({ code: code });
    const today = new Date();

    if (!coupon || !coupon.isActive || today > new Date(coupon.expirationDate))
      return res.json({
        success: false,
        message: "Coupon Doesn't Exist",
      });

    const userAlreadyUsedIt = coupon.usedByUsers.users.findIndex(
      (item) => item.userId.toString() === userId
    );

    if (userAlreadyUsedIt !== -1) {
      return res.json({
        success: false,
        message: "You Already Used The Coupon !",
      });
    }
    
    return res.status(200).json({
      success: true,
      discount: coupon.discountValue,
    });
  } catch (error) {
    console.log(error);
    req.status(500).json({
      status: false,
      message: "Error Occured",
    });
  }
};

export { useCoupon, getCoupon };
