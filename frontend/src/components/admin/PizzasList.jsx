import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePizza, fetchAllPizzas } from "../../store/reducers/pizzaSlice";
import Loading from "../common/Loading";
import AdminPizzaDetails from "./AdminPizzaDetails";
import DeleteConfirmation from "./DeleteConfirmation";
import { setToastAction } from "../../store/reducers/featuresSlice";

const PizzasList = () => {
  const { allPizzas, loading } = useSelector((state) => state.pizzaSlice);
  const dispatch = useDispatch();

  const [selectedPizza, setSelectedPizza] = useState(null);
  const [deleteSelectedPizza, setDeleteSelectedPizza] = useState(null);

  const handleConfirmation = (pizza) => {
    dispatch(deletePizza({ id: pizza?._id })).then((data) => {
      dispatch(fetchAllPizzas());
      dispatch(setToastAction(data?.payload?.message));
      setTimeout(() => dispatch(setToastAction(null)), 3000);
      setDeleteSelectedPizza(null);
    });
  };

  const handleViewDetails = (pizza) => {
    setSelectedPizza(pizza);
  };

  const handleDeletePizza = (pizza) => {
    setDeleteSelectedPizza(pizza);
  };

  useEffect(() => {
    dispatch(fetchAllPizzas());
  }, [dispatch]);
  return (
    <div>
      <h2>Pizzas List</h2>
      <div className="py-4">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-black text-white">
              <tr>
                <th className="px-4 py-2 text-sm font-medium text-center">
                  Pizza Img
                </th>
                <th className="px-4 py-2 text-sm font-medium text-center">
                  Pizza Name
                </th>
                <th className="px-4 py-2 text-sm font-medium text-center">
                  Pizza Categorie
                </th>
                <th className="px-4 py-2 text-sm font-medium text-center">
                  Change Info
                </th>
                <th className="px-4 py-2 text-center text-sm font-medium">
                  Delete
                </th>
              </tr>
            </thead>
            {loading ? (
              <Loading />
            ) : (
              <tbody className="bg-white divide-y divide-gray-200 text-center">
                {allPizzas.map((pizza, index) => (
                  <tr key={index} className="hover:bg-gray-100 ">
                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                      <img
                        src={pizza.img}
                        alt={pizza.name}
                        className="h-12 w-12 md:h-20 md:w-20 object-cover "
                      />
                    </td>
                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                      {pizza.name}
                    </td>
                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                      {pizza.categorie}
                    </td>
                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                      <button
                        className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
                        onClick={() => handleViewDetails(pizza)}
                      >
                        Change Info
                      </button>
                    </td>
                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                      <button
                        className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                        onClick={() => handleDeletePizza(pizza)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
      {selectedPizza && (
        <AdminPizzaDetails setOpen={setSelectedPizza} Pizza={selectedPizza} />
      )}
      {deleteSelectedPizza && (
        <DeleteConfirmation
          setOpen={setDeleteSelectedPizza}
          Item={deleteSelectedPizza}
          handleConfirmation={handleConfirmation}
        />
      )}
    </div>
  );
};

export default PizzasList;
