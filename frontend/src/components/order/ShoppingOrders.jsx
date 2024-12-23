import React, { useEffect, useState } from "react";
import ShoppingOrderDetails from "./ShoppingOrderDetails";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersByUserId } from "../../store/reducers/orderSlice";

const statusColor = {
  pending: "bg-black",
  delivered: "bg-green-600",
  rejected: "bg-red-600",
};

const ShoppingOrders = () => {
  const { orderList } = useSelector((state) => state.orderSlice);
  const { user } = useSelector((state) => state.auth);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersByUserId(user?.id));
  }, [dispatch, user]);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setOpenDetailsDialog(true);
  };

  return (
    <div className="">
      <h2>Order History</h2>
      <div className="py-4">
        <div className="overflow-x-auto">
          <table className=" divide-y divide-gray-200">
            <thead className="bg-black text-white">
              <tr>
                <th className="px-4 py-2 text-sm font-medium text-center">
                  Order ID
                </th>
                <th className="px-4 py-2 text-sm font-medium text-center">
                  Order Date
                </th>
                <th className="px-4 py-2 text-sm font-medium text-center">
                  Order Price
                </th>
                <th className="px-4 py-2 text-sm font-medium text-center">
                  Order Status
                </th>

                <th className="px-4 py-2 text-left text-sm font-medium">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orderList?.length > 0 &&
                orderList.map((order, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="px-4 py-4 text-sm whitespace-nowrap text-center">
                      {order._id}
                    </td>
                    <td className="px-4 py-4 text-sm whitespace-nowrap text-center">
                      {new Date(order.createdAt).toISOString().split("T")[0]}
                    </td>
                    <td className="px-4 py-4 text-sm whitespace-nowrap text-center">
                      {order.totalAmount}$
                    </td>
                    <td className={`px-4  py-4 text-sm whitespace-nowrap  `}>
                      <div
                        className={`py-1 px-3 text-white text-center rounded-2xl ${
                          statusColor[order.orderStatus]
                        }`}
                      >
                        {order.orderStatus}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                      <button
                        className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                        onClick={() => handleViewDetails(order)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {openDetailsDialog && selectedOrder && (
        <ShoppingOrderDetails
          user={user}
          order={selectedOrder}
          setOpenDetailsDialog={setOpenDetailsDialog}
        />
      )}
    </div>
  );
};

export default ShoppingOrders;
