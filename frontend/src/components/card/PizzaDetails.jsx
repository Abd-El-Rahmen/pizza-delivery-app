import { X } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchAllItems } from "../../store/reducers/cartSlice";
import { setToastAction } from "../../store/reducers/featuresSlice";

const PizzaDetails = ({ pizza, setPizzaDetails }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [selectedVariant, setSelectedVariant] = useState("small");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
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
    setPizzaDetails(null)
  };

  if (!pizza) {
    return null;
  }
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-20">
      <div className="bg-white relative flex flex-col md:flex-row overflow-y-auto max-w-[800px] max-h-[600px] md:max-h-full items-center gap-8 rounded-lg shadow-lg p-6 justify-between z-30 ">
        <button
          className="absolute top-4 right-4"
          onClick={() => setPizzaDetails(null)}
        >
          <X size={30} />
        </button>
        <img
          src={pizza.img}
          alt={pizza.name}
          className="rounded-lg object-cover shadow-lg h-60 w-60 self-center md:w-96 md:h-96 md:self-start"
        />
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold mt-4">{pizza.name}</h1>
          <h1 className="text-xl font-bold underline">{pizza.categorie}</h1>
          <p className="mt-2 text-gray-700 text-wrap ">{pizza.description}</p>
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
          <span className="text-3xl font-bold text-green-600">
            Price: $
            {pizza.variants[selectedVariant].toFixed(2) * selectedQuantity}
          </span>
          <button onClick={handleAddToCart} className="button w-full  ">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaDetails;
