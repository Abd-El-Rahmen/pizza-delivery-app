import React from "react";
import img from "../../assets/TodaysDeal.png";

const TodaysDeal = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center px-10 md:px-52 my-8 gap-6">
      <div className=" w-full md:w-1/2">
        <img
          src={img}
          alt="Pizza in skillet"
          className="w-80 h-80  rounded-lg"
        />
      </div>

      <div className="w-full md:w-1/2 text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          <span className="font-extrabold">Today's </span>Deal
        </h2>
        <p className="text-gray-600 mb-6">
          Do you want to know how we make delicious pizza? You can check our
          YouTube Channel over here and
          <span className="font-semibold text-blue-600">
            {" "}
            discover the secrets behind our mouth-watering pizzas!
          </span>
          From the fresh ingredients to our perfect crust, watch our chefs in
          action as they craft each pizza with love and passion.
          <span className="text-blue-500 hover:underline cursor-pointer">
            Click here to dive into the pizza-making process!
          </span>
          Join our pizza journey and get inspired to create your own at home.
        </p>
        <button className="px-6 py-3 bg-red-400 text-white rounded-lg hover:bg-red-500 transition">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default TodaysDeal;
