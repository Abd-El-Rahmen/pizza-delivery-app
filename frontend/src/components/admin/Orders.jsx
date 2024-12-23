import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../store/reducers/orderSlice";
import Loading from "../common/Loading";
import AdminOrderDetails from "./AdminOrderDetails";

const OrdersList = () => {
  const { allOrders, isLoading } = useSelector((state) => state.orderSlice);
  const dispatch = useDispatch();
 
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);
  

  return (
    <div>
      <h2>Orders</h2>
      <div className="py-4">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-black text-white">
              <tr>
                <th className="px-4 py-2 text-sm font-medium text-center">
                  Order ID
                </th>
                <th className="px-4 py-2 text-sm font-medium text-center">
                  Order Date
                </th>
                <th className="px-4 py-2 text-sm font-medium text-center">
                  Total Price
                </th>
                <th className="px-4 py-2 text-sm font-medium text-center">
                  Order Status
                </th>

                <th className="px-4 py-2 text-center text-sm font-medium">
                  Details
                </th>
              </tr>
            </thead>
            {isLoading ? (
              <Loading />
            ) : (
              <tbody className="bg-white divide-y divide-gray-200 text-center">
                {allOrders.map((order, index) => (
                  <tr key={index} className="hover:bg-gray-100 ">
                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                      {order._id}
                    </td>
                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                      {new Date(order.createdAt).toISOString().split("T")[0]}
                    </td>
                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                      {order.totalAmount}$
                    </td>
                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                      {order.orderStatus}
                    </td>
                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                      <button
                        className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
                        onClick={() => handleViewDetails(order)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
      {selectedOrder && (
        <AdminOrderDetails
          setOpen={setSelectedOrder}
          order={selectedOrder}
        />
      )}
    </div>
  );
};

export default OrdersList;
