import { useEffect, useState } from "react";
import NavBar from "./components/navbar/NavBar.jsx";
import Home from "./pages/user/Home";
import { Route, Routes } from "react-router-dom";
import Cart from "./pages/user/Cart";
import CheckAuth from "./components/common/CheckAuth.jsx";
import { useDispatch, useSelector } from "react-redux";
import Register from "./components/auth/Register.jsx";
import Login from "./components/auth/Login.jsx";
import { checkAuth } from "./store/reducers/authSlice";
import Loading from "./components/common/Loading.jsx";
import SuccessPayment from "./pages/user/success";
import Account from "./pages/user/account.jsx";
import { SearchInPizzas } from "./pages/user/search.jsx";
import NotFound from "./pages/common/NotFound.jsx";
import AdminPage from "./pages/admin/AdminPage.jsx";

function App() {
  const [openRegisterPage, setOpenRegisterPage] = useState(false);
  const [openLoginPage, setOpenLoginPage] = useState(false);
  const { toast } = useSelector((state) => state.features);
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  if (isLoading) return <Loading />;

  if (!isAuthenticated || user.role === "user")
    return (
      <div className="pt-16 ">
        <div
          className={`fixed bottom-5 right-5  bg-red-500 text-white p-3 rounded shadow-lg z-50 transition-transform  duration-300 ${
            toast !== null ? "translate-x-0" : "translate-x-[2000px]"
          }`}
        >
          {toast}
        </div>

        <NavBar
          isAuthenticated={isAuthenticated}
          user={user}
          setOpenRegisterPage={setOpenRegisterPage}
          setOpenLoginPage={setOpenLoginPage}
        />
        <Register open={openRegisterPage} setOpen={setOpenRegisterPage} />
        <Login open={openLoginPage} setOpen={setOpenLoginPage} />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/cart"
            element={
              <CheckAuth isAuthenticated={isAuthenticated}>
                <Cart />
              </CheckAuth>
            }
          />
          <Route path="/success" element={<SuccessPayment />} />
          <Route
            path="/account"
            element={
              <CheckAuth isAuthenticated={isAuthenticated}>
                <Account />
              </CheckAuth>
            }
          />
          <Route path="/search" element={<SearchInPizzas />} />
        </Routes>
      </div>
    );
  return (
    <Routes>
    
      <Route path="/" element={<AdminPage />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App;
