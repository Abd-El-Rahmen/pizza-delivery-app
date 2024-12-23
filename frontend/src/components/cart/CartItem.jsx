import React from "react";
import { X } from "lucide-react";

const CartItem = ({ item, handleDeleteItem, handleUpdateCart }) => {
  return (
    <div
      key={item._id}
      className="relative grid grid-cols-3 sm:grid-cols-4 items-center gap-8 border-b p-0 sm:p-4"
    >
      <div className="flex items-center space-x-4 col-span-2">
        <img
          src={item.img}
          alt={item.name}
          className="w-20 h-20 rounded-lg object-cover"
        />
        <div className="flex flex-col gap-1">
          <h4 className="font-semibold text-lg">{item.name}</h4>
          <p className="text-sm text-gray-500">
            Price: {Object.values(item.selectedVariant)}$
          </p>
          <p className="text-sm text-gray-500">
            Size: {Object.keys(item.selectedVariant)}
          </p>
          <div className="items-center space-x-2 flex sm:hidden">
            <button
              disabled={item.quantity === 1}
              onClick={() => handleUpdateCart(false, item.pizzaId)}
              className="w-7 h-7 flex items-center justify-center border rounded-md text-gray-500 hover:bg-gray-100"
            >
              -
            </button>
            <span className="text-gray-700">{item.quantity}</span>
            <button
              // disabled={item.quantity === 10}
              onClick={() => handleUpdateCart(true, item.pizzaId)}
              className="w-7 h-7 flex items-center justify-center border rounded-md text-gray-500 hover:bg-gray-100"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="items-center space-x-2 hidden sm:flex">
        <button
          disabled={item.quantity === 1}
          onClick={() => handleUpdateCart(false, item.pizzaId)}
          className="w-7 h-7 flex items-center justify-center border rounded-md text-gray-500 hover:bg-gray-100"
        >
          -
        </button>
        <span className="text-gray-700">{item.quantity}</span>
        <button
          disabled={item.quantity === 10}
          onClick={() => handleUpdateCart(true, item.pizzaId)}
          className="w-7 h-7 flex items-center justify-center border rounded-md text-gray-500 hover:bg-gray-100"
        >
          +
        </button>
      </div>

      <div className="text-orange-400 font-semibold">
        ${item.quantity * Object.values(item.selectedVariant)}
      </div>
      <button
        onClick={() => handleDeleteItem(item?.pizzaId)}
        className="text-red-500 hover:text-red-700 absolute right-3 translate-y-[20%] text-sm"
      >
        <X/>
      </button>
    </div>
  );
};

export default CartItem;
