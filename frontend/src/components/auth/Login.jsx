import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setToastAction } from "../../store/reducers/featuresSlice";
import { X } from "lucide-react";
import { loginUser } from "../../store/reducers/authSlice";

const initialFormData = {
  email: "",
  password: "",
};

const Login = ({ open, setOpen }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!formData.email || !formData.password) {
      setError("All fields are required!");
      return;
    }
    dispatch(loginUser(formData)).then((data) => {
      dispatch(setToastAction(data?.payload?.message));
      setTimeout(() => dispatch(setToastAction(null)), 3000);
      setOpen(false);
      setFormData(initialFormData);
    });
  };
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-20">
      <div className="bg-white relative flex flex-col overflow-y-auto md:w-[700px] w-[350px] max-h-[600px] md:max-h-full items-center gap-8 rounded-lg shadow-lg p-6 justify-between z-30 ">
        <button
          className="absolute top-4 right-4"
          onClick={() => setOpen(false)}
        >
          <X size={30} />
        </button>
        <h2 className="text-2xl font-bold text-center mb-6 text-black">
          Login
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <button
            type="submit"
           className="button w-full h-12"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;