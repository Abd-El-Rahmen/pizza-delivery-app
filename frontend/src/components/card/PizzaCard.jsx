import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchAllItems } from "../../store/reducers/cartSlice";
import { setToastAction } from "../../store/reducers/featuresSlice";

const PizzaCard = ({ pizza, handleChangePizzaDetails }) => {
  const [selectedVariant, setSelectedVariant] = useState("small");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const handleClick = () => {
    handleChangePizzaDetails(pizza);
  };

  const handleVariantChange = (e) => {
    setSelectedVariant(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setSelectedQuantity(e.target.value);
  };

  const handleAddToCart = () => {
    if (isAuthenticated) {
      dispatch(
        addToCart({
          userId: user?.id,
          pizzaId: pizza?._id,
          quantity: selectedQuantity,
          selectedVariant: {
            [selectedVariant]: pizza.variants[selectedVariant],
          },
        })
      ).then((data) => {
        if (!data?.payload?.success) {
          dispatch(setToastAction(data?.payload?.message));
          setTimeout(() => dispatch(setToastAction(null)), 3000);
        }
        dispatch(fetchAllItems(user?.id));
      });
    } else {
      dispatch(setToastAction("You Need to Sign in"));
      setTimeout(() => dispatch(setToastAction(null)), 3000);
    }
  };

  return (
    <div className="border bg-white rounded-lg shadow-lg p-4 w-80 sm:w-64 m-4 transition-transform duration-200 hover:shadow-2xl flex flex-col gap-3">
      <h3
        onClick={() => handleClick()}
        className="text-xl font-semibold hover:underline cursor-pointer truncate"
      >
        {pizza.name}
      </h3>
      <img
        onClick={() => handleClick()}
        src={pizza.img}
        alt={pizza.name}
        className="h-64 w-64 object-cover cursor-pointer"
      />
      <div className="grid grid-cols-2 gap-2">
        <select
          value={selectedVariant}
          onChange={handleVariantChange}
          className="border border-black rounded-lg p-2  cursor-pointer"
        >
          {Object.keys(pizza.variants).map((variant) => (
            <option key={variant} value={variant}>
              {variant.charAt(0).toUpperCase() + variant.slice(1)}
            </option>
          ))}
        </select>
        <select
          value={selectedQuantity}
          onChange={handleQuantityChange}
          className="border border-black rounded-lg p-2 cursor-pointer"
        >
          {[...Array(10).keys()].map((i) => (
            <option key={i} value={i}>
              {i++}
            </option>
          ))}
        </select>
      </div>

      <p className="mt-2 text-lg font-bold">
        Price: ${pizza.variants[selectedVariant].toFixed(2) * selectedQuantity}
      </p>
      <button onClick={() => handleAddToCart()} className="button">
        Add to Cart
      </button>
    </div>
  );
};

export default PizzaCard;
