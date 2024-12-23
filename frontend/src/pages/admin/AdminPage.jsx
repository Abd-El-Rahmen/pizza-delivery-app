import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import UsersList from "../../components/admin/Usres";
import PizzasList from "../../components/admin/PizzasList";
import AddPizza from "../../components/admin/AddPizza";
import OrdersList from "../../components/admin/Orders";
import { LogOut } from "lucide-react";
import { logoutUser } from "../../store/reducers/authSlice";

const sections = [
  { id: "PizzasList", label: "Pizzas List" },
  { id: "AddPizza", label: "Add Pizza" },
  { id: "UsersList", label: "Users List" },
  { id: "OrdersList", label: "Orders List" },
];

const AdminPage = () => {
  const { toast } = useSelector((state) => state.features);
  const dispatch = useDispatch();

  const [adminSection, setAdminSection] = useState(sections[0].id);
  return (
    <div className="mx-auto  max-w-5xl mt-16">
      <div
        onClick={() => dispatch(logoutUser())}
        className={`fixed top-2 right-2 md:right-5  bg-red-500 text-white p-3 rounded-full  z-50 transition-transform  duration-300 cursor-pointer hover:translate-x-1`}
      >
        <LogOut />
      </div>

      <div
        className={`fixed bottom-5 right-5  bg-red-500 text-white p-3 rounded shadow-lg z-50 transition-transform  duration-300 ${
          toast !== null ? "translate-x-0" : "translate-x-[2000px]"
        }`}
      >
        {toast}
      </div>
      <div>
        <div className="flex gap-1 rounded-lg h-12 bg-gray-100 overflow-x-auto whitespace-nowrap">
          {sections.map((section) => (
            <div
              className={`py-3 px-5 cursor-pointer rounded-lg ${
                adminSection === section.id
                  ? "bg-gray-200"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => setAdminSection(section.id)}
            >
              {section.label}
            </div>
          ))}
        </div>
        <div className="p-3">
          {adminSection === "OrdersList" && <OrdersList />}
          {adminSection === "UsersList" && <UsersList />}
          {adminSection === "PizzasList" && <PizzasList />}
          {adminSection === "AddPizza" && <AddPizza />}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
