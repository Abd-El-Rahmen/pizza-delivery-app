import { X } from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAllPizzas, updatePizza } from "../../store/reducers/pizzaSlice";
import { setToastAction } from "../../store/reducers/featuresSlice";

const AdminPizzaDetails = ({ Pizza, setOpen }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: Pizza.name || "",
    img: Pizza.img || "",
    variants: Pizza.variants || {},
    categorie: Pizza.categorie || "",
    description: Pizza.description || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleVariantChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      variants: {
        ...formData.variants,
        [name]: value,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePizza({ id: Pizza._id, formData: formData })).then(
      (data) => {
        dispatch(fetchAllPizzas());
        dispatch(setToastAction(data?.payload?.message));
        setTimeout(() => dispatch(setToastAction(null)), 3000);
        setOpen(null);
      }
    );
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-20 ">
      <div className="bg-white w-2/3 md:w-2/5 relative flex flex-col overflow-y-auto max-h-[500px]  items-center gap-8 rounded-lg shadow-lg p-10 z-30 \">
        <button
          onClick={() => setOpen(null)}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 transition duration-200"
        >
          <X size={24} />
        </button>
        <div className="flex flex-col w-full">
          <h2 className="text-2xl font-bold text-center mb-6">Edit Pizza</h2>
          <form onSubmit={handleSubmit} className="space-y-6 w-full">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-lg font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border-2 border-gray-300 rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-black transition"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="img" className="text-lg font-medium">
                Image URL
              </label>
              <input
                type="text"
                id="img"
                name="img"
                value={formData.img}
                onChange={handleChange}
                required
                className="border-2 border-gray-300 rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-black transition"
              />
            </div>

            {Object.keys(formData.variants).map((variant) => (
              <div key={variant} className="flex flex-col">
                <label htmlFor={variant} className="text-lg font-medium">
                  {variant}
                </label>
                <input
                  type="number"
                  id={variant}
                  name={variant}
                  value={formData.variants[variant]}
                  onChange={handleVariantChange}
                  className="border-2 border-gray-300 rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-black transition"
                  required
                />
              </div>
            ))}

            <div className="flex flex-col">
              <label htmlFor="categorie" className="text-lg font-medium">
                Category
              </label>
              <input
                type="text"
                id="categorie"
                name="categorie"
                value={formData.categorie}
                onChange={handleChange}
                required
                className="border-2 border-gray-300 rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-black transition"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="description" className="text-lg font-medium">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="border-2 border-gray-300 rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-black transition"
              />
            </div>

            <button
              type="submit"
              className="button w-full h-12"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminPizzaDetails;
