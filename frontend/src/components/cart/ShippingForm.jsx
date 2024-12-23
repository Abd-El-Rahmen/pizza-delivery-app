import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCoupon } from "../../store/reducers/couponSlice";
import { setToastAction } from "../../store/reducers/featuresSlice";

function ShippingForm({
  subTotal,
  totalAmount,
  deliveryPrice,
  formData,
  setFormData,
  handlePayment,
}) {
  const [couponCode, setCouponCode] = useState("");

  const dispatch = useDispatch();
  const { isLoading, discount, validCoupon } = useSelector(
    (state) => state.couponSlice
  );
  const { user } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCouponCodeChange = (e) => {
    setCouponCode(e.target.value);
  };

  const handleVerifieCoupon = () => {
    const dataToSend = {
      userId: user?.id,
      code: couponCode,
    };
    dispatch(getCoupon(dataToSend)).then((data) => {
      if (!data?.payload?.success) {
        dispatch(setToastAction(data?.payload?.message));
        setTimeout(() => dispatch(setToastAction(null)), 3000);
      } else {
        setFormData({ ...formData, coupon: couponCode });
      }
    });
  };

  return (
    <div className="w-full md:max-w-md mx-auto p-6 bg-gray-50 shadow-md rounded-2xl ">
      <div className="mb-6">
        <h2 className="font-semibold text-lg mb-3">Calculated Shipping</h2>
        <form className="space-y-3">
          <input
            type="text"
            placeholder="Street Address"
            id="streetAddress"
            name="streetAddress"
            onChange={handleChange}
            value={formData.streetAddress}
            className="w-full p-3 border rounded-md text-gray-600"
          />

          <div className="flex space-x-2">
            <select
              className="w-1/2 p-3 border rounded-md text-gray-600"
              defaultValue=""
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
            >
              <option value="" disabled>
                State / City
              </option>
              <option value="New York">New York</option>
              <option value="California">California</option>
            </select>
            <input
              type="text"
              placeholder="ZIP Code"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className="w-1/2 p-3 border rounded-md text-gray-600"
            />
          </div>

          <input
            type="text"
            placeholder="Phone Number"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 border rounded-md text-gray-600"
          />
        </form>
      </div>

      <div className="mb-6">
        <h2 className="font-semibold text-lg mb-2">Coupon Code</h2>
        <p className="text-gray-500 text-sm mb-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Design by
          Fluttertop
        </p>
        <form className="space-y-3">
          <input
          disabled={validCoupon}
            type="text"
            placeholder="Coupon Code"
            name="coupon-code"
            value={couponCode}
            onChange={handleCouponCodeChange}
            className="w-full p-3 border rounded-md text-gray-600"
          />
          <button
            disabled={validCoupon || couponCode.length !== 10}
            onClick={handleVerifieCoupon}
            type="button"
            className={`w-full py-3 text-white font-semibold rounded-md  cursor-pointer ${
              validCoupon
                ? "bg-red-700"
                : couponCode.length !== 10
                ? "bg-gray-200"
                : "bg-red-500 hover:bg-red-700"
            }`}
          >
            {isLoading ? "..." : validCoupon ? "Applied ✔" : "Apply"}
          </button>
        </form>
      </div>

      <div className="bg-yellow-100 p-5 rounded-md">
        <h2 className="font-semibold text-lg mb-3">Cart Total</h2>
        <div className="space-y-2 text-gray-600">
          <div className="flex justify-between">
            <span>Cart Subtotal</span>
            <span>${subTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery</span>
            <span className="text-green-500">
              {deliveryPrice > 0.0 ? deliveryPrice : "Free"}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Discount</span>
            <span className="text-red-500">- ${discount ? discount : 0}</span>
          </div>
          <hr className="border-gray-300" />
          <div className="flex justify-between font-semibold text-gray-800">
            <span>Cart Total</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={handlePayment}
          type="button"
          className="mt-4 w-full py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export default ShippingForm;
