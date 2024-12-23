import React, { useEffect, useRef, useState } from "react";
import PizzaCard from "../../components/card/PizzaCard";
import PizzaDetails from "../../components/card/PizzaDetails";
import { useDispatch, useSelector } from "react-redux";
import { getRandomPizzas } from "../../store/reducers/pizzaSlice";
import Loading from "../../components/common/Loading";
import slide from "../../assets/food.png";
import Taste from "../../components/sections/Taste";
import TodaysDeal from "../../components/sections/TodaysDeal";
import YoutubeChannel from "./YoutubeChannel";
import Footer from "./Footer";

const Home = () => {
  const { pizzaList, loading } = useSelector((state) => state.pizzaSlice);
  const dispatch = useDispatch();
  const [pizzaDetails, setPizzaDetails] = useState(null);
  const shopNowRef = useRef(null);
  const handleChangePizzaDetails = (pizza) => {
    setPizzaDetails(pizza);
  };
  useEffect(() => {
    dispatch(getRandomPizzas());
  }, [dispatch]);

  const scrollToShopNow = () => {
    if (shopNowRef.current) {
      shopNowRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col items-center ">
      <div className="relative w-full h-[250px]  md:h-[400px] lg:h-[600px] overflow-hidden">
        <img
          src={slide}
          className={`cursor-pointer absolute top-0 left-0 w-full h-auto object-cover transition-opacity duration-1000`}
          onClick={scrollToShopNow}
        />
      </div>
      {loading ? (
        <Loading />
      ) : pizzaList && pizzaList.length > 0 ? (
        <>
          <Taste />
          <TodaysDeal />
            <h2 ref={shopNowRef} className="my-10 text-4xl font-extrabold">
              Buy Now
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 ">
              {pizzaList.map((pizza) => (
                <PizzaCard
                  key={pizza.name}
                  pizza={pizza}
                  handleChangePizzaDetails={handleChangePizzaDetails}
                />
              ))}
            </div>
          <YoutubeChannel  />

          <Footer/>
        </>
      ) : (
        <span className="p-5 font-bold text-red-500">
          Something went wrong -_-
        </span>
      )}
      {pizzaDetails && (
        <PizzaDetails   pizza={pizzaDetails} setPizzaDetails={setPizzaDetails} />
      )}
    </div>
  );
};

export default Home;
