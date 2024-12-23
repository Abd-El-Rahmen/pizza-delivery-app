import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPizza } from "../../store/reducers/pizzaSlice";
import { setToastAction } from "../../store/reducers/featuresSlice";

const AddPizza = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    img: "",
    variants: { small: 0, medium: 0, large: 0 },
    categorie: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleVariantChange = (e, variant) => {
    const { value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      variants: {
        ...prevState.variants,
        [variant]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addPizza(formData))
      .then((data) => {
        dispatch(setToastAction(data?.payload?.message));
        setTimeout(() => dispatch(setToastAction(null)), 3000);
        setFormData({
          name: "",
          img: "",
          variants: { small: 0, medium: 0, large: 0 },
          categorie: "",
          description: "",
        });
      })
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md mt-2">
      
      <h2 className="text-2xl font-semibold text-center mb-6">Add New Pizza</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="img"
            className="block text-sm font-medium text-gray-700"
          >
            Image URL
          </label>
          <input
            type="text"
            id="img"
            name="img"
            value={formData.img}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Variants
          </label>
          <div className="grid grid-cols-3 gap-4">
            {["small", "medium", "large"].map((variant) => (
              <div key={variant}>
                <label htmlFor={variant} className="block text-sm font-medium">
                  {variant.charAt(0).toUpperCase() + variant.slice(1)} Size
                </label>
                <input
                  type="number"
                  id={variant}
                  name={variant}
                  value={formData.variants[variant]}
                  onChange={(e) => handleVariantChange(e, variant)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="categorie"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <input
            type="text"
            id="categorie"
            name="categorie"
            value={formData.categorie}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        <button
          type="submit"
          className="button w-full h-12"
        >
          Add Pizza
        </button>
      </form>
    </div>
  );
};

export default AddPizza;
