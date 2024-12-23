import React, { useState } from "react";
import UpdateInfo from "../../components/auth/UpdateInfo";
import { useSelector } from "react-redux";
import ShoppingOrders from "../../components/order/ShoppingOrders";

const sections = [
  { id: "profile", label: "My Profile" },
  { id: "orders", label: "Orders" },
];

const Account = () => {
  const { user } = useSelector((state) => state.auth);
  const [accountSection, setAccountSection] = useState(sections[0].id);
  return (
    <div className="mx-auto  max-w-5xl mt-10 ">
      <div>
        <div className="flex gap-1 rounded-lg h-12 bg-gray-100">
          {sections.map((section) => (
            <div
              className={`py-3 px-5 cursor-pointer rounded-lg ${
                accountSection === section.id
                  ? "bg-gray-200"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => setAccountSection(section.id)}
            >
              {section.label}
            </div>
          ))}
        </div>
        <div className="p-3">
          {accountSection === "profile" && (
            <UpdateInfo user={user ? user : {}} />
          )}
          {accountSection === "orders" && <ShoppingOrders />}
        </div>
      </div>
    </div>
  );
};

export default Account;
