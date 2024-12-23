import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getAllUsers } from "../../store/reducers/authSlice";
import Loading from "../common/Loading";
import DeleteConfirmation from "./DeleteConfirmation";
import { setToastAction } from "../../store/reducers/featuresSlice";

const UsersList = () => {
  const { allUsers, getUsersLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState(null);

  const handleDeleteConfirmation = (user) => {
      dispatch(deleteUser({ id: user?._id })).then((data) => {
        dispatch(getAllUsers());
        dispatch(setToastAction(data?.payload?.message));
        setTimeout(() => dispatch(setToastAction(null)), 3000);
        setSelectedUser(null);
      });
    };

  const handleDeleteUser = (user) => {
    setSelectedUser(user)
  }
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div>
      <h2>Usres List</h2>
      <div className="py-4">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-black text-white">
              <tr>
                <th className="px-4 py-2 text-sm font-medium text-center">
                  User ID
                </th>
                <th className="px-4 py-2 text-sm font-medium text-center">
                  User Username
                </th>
                <th className="px-4 py-2 text-sm font-medium text-center">
                  User Email
                </th>
                <th className="px-4 py-2 text-sm font-medium text-center">
                  Delete
                </th>
              </tr>
            </thead>
            {getUsersLoading ? (
              <Loading />
            ) : (
              <tbody className="bg-white divide-y divide-gray-200 text-center">
                {allUsers?.map((user, index) => (
                  <tr key={index} className="hover:bg-gray-100 ">
                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                      {user._id}
                    </td>

                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                      {user.userName}
                    </td>
                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                      {user.email}
                    </td>
                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                      <button
                        className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                        onClick={() => handleDeleteUser(user)}
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
      {selectedUser && <DeleteConfirmation Item={selectedUser} setOpen={setSelectedUser} handleConfirmation={handleDeleteConfirmation}/>}
    </div>
  );
};

export default UsersList;
