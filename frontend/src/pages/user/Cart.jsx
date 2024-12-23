import React, { useEffect, useState } from "react";
import CartItem from "../../components/cart/CartItem";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  deleteCartItem,
  fetchAllItems,
  setEmptyCartAction,
} from "../../store/reducers/cartSlice";
import ShippingForm from "../../components/cart/ShippingForm";
import Loading from "../../components/common/Loading";
import { setToastAction } from "../../store/reducers/featuresSlice";
import { createNewOrder } from "../../store/reducers/orderSlice";
import { useNavigate } from "react-router-dom";
import { setFalseAction } from "../../store/reducers/couponSlice";

const initialAddressFormData = {
  streetAddress: "",
  state: "",
  phone: "",
  zipCode: "",
  coupon: "",
};

const Cart = () => {
  const { isLoading, cartItems } = useSelector((state) => state.cartSlice);
  const { discount, validCoupon } = useSelector((state) => state.couponSlice);
  const deliveryPrice = 0.0;
  const subTotal =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (acc, item) =>
            acc + Object.values(item.selectedVariant) * item.quantity,
          0
        )
      : 0;
  const totalAmount = subTotal + deliveryPrice - (discount ? discount : 0);
  const [formData, setFormData] = useState(initialAddressFormData);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleUpdateCart = (adding, pizzaId) => {
    dispatch(
      addToCart({
        userId: user?.id,
        pizzaId: pizzaId,
        quantity: adding ? 1 : "-1",
        selectedVariant: true,
      })
    ).then((data) => {
      if (!data?.payload?.success) {
        dispatch(setToastAction(data?.payload?.message));
        setTimeout(() => dispatch(setToastAction(null)), 3000);
      }
      dispatch(fetchAllItems(user?.id));
    });
  };

  const handleDeleteItem = (pizzaId) => {
    dispatch(deleteCartItem({ userId: user?.id, pizzaId: pizzaId })).then(
      (data) => {
        dispatch(fetchAllItems(user.id));
      }
    );
  };
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchAllItems(user.id));
    }
  }, [dispatch]);

  const handlePayment = () => {
    if (
      cartItems?.length <= 0 ||
      formData.city === "" ||
      formData.phone === "" ||
      formData.zipCode === "" ||
      formData.street === ""
    ) {
      dispatch(setToastAction("You have to fill all infos"));
      setTimeout(() => dispatch(setToastAction(null)), 3000);
    } else {
      const orderData = {
        userId: user?.id,
        cartItems: cartItems?.map((item) => ({
          pizzaId: item?.pizzaId,
          name: item?.name,
          selectedVariant: item?.selectedVariant,
          quantity: item?.quantity,
        })),
        coupon: validCoupon ? formData.coupon : "",
        addressInfo: formData,
        totalAmount: totalAmount,
      };
      dispatch(createNewOrder(orderData)).then((data) => {
        if (data?.payload?.success) {
          setFormData(initialAddressFormData);
          dispatch(setFalseAction());
          dispatch(setToastAction(data?.payload?.message));
          setTimeout(() => dispatch(setToastAction(null)), 3000);
          dispatch(setEmptyCartAction());
          navigate("/success");
        }
      });
    }
  };

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-1">
      <div className="col-span-2">
        <div className=" mb-2 p-4">
          <h2 className="font-semibold text-lg">Shopping Cart</h2>
          <h4>You Have {cartItems.length} Items</h4>
        </div>
        <div className="p-3 sm:p-6 bg-white rounded-2xl">
          <div className="hidden sm:grid grid-cols-4 gap-4 border-b p-4 text-gray-600 font-semibold">
            <div className="col-span-2">Product</div>
            <div>Quantity</div>
            <div>Total Price</div>
          </div>

          {isLoading ? (
            <Loading />
          ) : (
            cartItems &&
            cartItems.length > 0 &&
            cartItems.map((item) => (
              <CartItem
                item={item}
                handleDeleteItem={handleDeleteItem}
                handleUpdateCart={handleUpdateCart}
              />
            ))
          )}
        </div>
      </div>
      <div>
        <ShippingForm
          totalAmount={totalAmount}
          deliveryPrice={deliveryPrice}
          formData={formData}
          setFormData={setFormData}
          subTotal={subTotal}
          handlePayment={handlePayment}
        />
      </div>
    </div>
  );
};

export default Cart;
