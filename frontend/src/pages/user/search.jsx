import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Loading from "../../components/common/Loading";
import { searchInPizzas } from "../../store/reducers/pizzaSlice";
import PizzaCard from "../../components/card/PizzaCard";
import PizzaDetails from "../../components/card/PizzaDetails";

export const SearchInPizzas = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { pizzaList, loading } = useSelector((state) => state.pizzaSlice);
  const [pizzaDetails, setPizzaDetails] = useState(null);

  const handleChangePizzaDetails = (pizza) => {
    setPizzaDetails(pizza);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = { name: queryParams.get("query") };
    dispatch(searchInPizzas(query));
  }, [location.search, dispatch]);

  if (loading) return <Loading />;

  return (
    <div className="flex  justify-center ">
      {pizzaList.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {pizzaList.map((pizza) => (
            <PizzaCard key={pizza.name} handleChangePizzaDetails={handleChangePizzaDetails} pizza={pizza} />
          ))}
        </div>
      )}
       {pizzaDetails && (
        <PizzaDetails pizza={pizzaDetails} setPizzaDetails={setPizzaDetails} />
      )}
    </div>
  );
};

export default SearchInPizzas;
