import React, { useEffect, useState } from "react";
import {
  CircleX,
  ShoppingCart,
  Menu,
  House,
  CircleUser,
  LogOut,
} from "lucide-react";
import {  useNavigate } from "react-router-dom";
import { logoutUser } from "../../store/reducers/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllItems } from "../../store/reducers/cartSlice";
const NavBar = ({ isAuthenticated, setOpenRegisterPage, setOpenLoginPage }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openSidebar, setOpenSidebar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useSelector((state) => state.auth);
  const { cartItems, isLoading } = useSelector((state) => state.cartSlice);

  const handleOnChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  useEffect(() => {
    dispatch(fetchAllItems(user?.id));
  }, [dispatch]);

  return (
    <nav className="flex items-center justify-between py-3 px-6 shadow-lg fixed top-0 left-0 w-full z-50 bg-white">
      <div
        onClick={() => navigate("/")}
        className="text-2xl font-semibold cursor-pointer"
      >
        Food
      </div>
      <div className="flex items-center flex-1 w-20 overflow-x-hidden mx-8 border-2 border-gray-200 rounded-full">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleOnChange}
          className="border-hidden outline-none px-2 py-1 bg-transparent flex-1 "
          onKeyPress={handleKeyPress}
        />
      </div>
      <ul className="flex space-x-4 items-center">
        <li
          onClick={() => setOpenLoginPage(true)}
          className={`cursor-pointer bg-red-400 p-2 rounded-2xl hover:bg-red-500 hidden  ${
            !isAuthenticated ? "sm:block" : ""
          }`}
        >
          <span className="text-white">Sign In</span>
        </li>
        <li
          onClick={() => setOpenRegisterPage(true)}
          className={`cursor-pointer hidden  p-2  ${
            !isAuthenticated ? "sm:block" : ""
          }`}
        >
          <span className="hover:text-red-400 transition duration-300">
            Sign Up
          </span>
        </li>
        <li
          onClick={() => navigate("/")}
          className={`cursor-pointer bg-red-400 p-2 rounded-2xl hover:bg-red-500 hidden  ${
            isAuthenticated ? "sm:block" : ""
          }`}
        >
          <span className="text-white">
            <House />
          </span>
        </li>

        <li
          onClick={() => navigate("/account")}
          className={`cursor-pointer hidden hover:text-red-400   p-2  ${
            isAuthenticated ? "sm:block" : ""
          }`}
        >
          <span className="transition duration-300">
            <CircleUser />
          </span>
        </li>
        
        <li
          className={`cursor-pointer   p-2 relative  ${
            isAuthenticated ? "" : "hidden"
          }`}
        >
          <span className="absolute top-0 right-0 bg-red-500 rounded-full px-1 text-sm">
            {isLoading ? "" : cartItems?.length}
          </span>
          <span
            className="hover:text-red-400 transition duration-300"
            onClick={() => navigate("/cart")}
          >
            {<ShoppingCart />}
          </span>
        </li>
        <li
          onClick={() => dispatch(logoutUser())}
          className={`cursor-pointer hover:text-red-400  hidden  p-2  ${
            isAuthenticated ? "sm:block" : ""
          }`}
        >
          <span className="transition duration-300">
            <LogOut />
          </span>
        </li>
        <li className="sm:hidden">
          <span
            className="transition duration-300"
            onClick={() => setOpenSidebar(true)}
          >
            {<Menu />}
          </span>
        </li>
      </ul>
      {openSidebar && (
        <div
          className="fixed inset-0 z-10 bg-black opacity-50"
          onClick={() => setOpenSidebar(false)}
        />
      )}
      <aside
        className={`fixed right-0 z-20 top-0 w-52 h-full border-l overflow-y-auto bg-white p-6 transition-transform transform ${
          openSidebar ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-y-6">
          <div className="flex justify-between">
            <h2 className="text-xl font-bold">Food</h2>
            <button onClick={() => setOpenSidebar(false)}>
              <CircleX />
            </button>
          </div>
          <div>
            <ul className="flex flex-col gap-4 p-0">
              <li
                onClick={() => {
                  setOpenLoginPage(true);
                  setOpenSidebar(false);
                }}
                className={`p-2 font-bold  text-red-400 hover:bg-gray-200   ${
                  !isAuthenticated ? "sm:block" : "hidden"
                }`}
              >
                <span>Sign In</span>
              </li>
              <li
                onClick={() => {
                  setOpenRegisterPage(true);
                  setOpenSidebar(false);
                }}
                className={`p-2 font-bold  hover:bg-gray-200   ${
                  !isAuthenticated ? "sm:block" : "hidden"
                }`}
              >
                <span>Sign Up</span>
              </li>
              <li
                onClick={() => {
                  navigate("/");
                  setOpenSidebar(false);
                }}
                className={`p-2 hover:bg-gray-200 text-red-400   ${
                  isAuthenticated ? "sm:block" : "hidden"
                }`}
              >
                <span>Home</span>
              </li>

              <li
                onClick={() => {
                  navigate("/account");
                  setOpenSidebar(false);
                }}
                className={`p-2 hover:bg-gray-200   ${
                  isAuthenticated ? "sm:block" : "hidden"
                }`}
              >
                <span>Account</span>
              </li>
              <li
                onClick={() => {
                  dispatch(logoutUser());
                  setOpenSidebar(false);
                }}
                className={`p-2 hover:bg-gray-200   ${
                  isAuthenticated ? "sm:block" : "hidden"
                }`}
              >
                <span>Logout</span>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </nav>
  );
};

export default NavBar;
